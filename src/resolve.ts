import fs from 'node:fs'
import path from 'node:path'
import type { Alias, ResolvedConfig } from 'vite'
import {
  relativeify,
  normalizePath,
  node_modules as find_node_modules,
} from 'vite-plugin-utils/function'

export interface Resolved {
  type: 'alias' | 'bare'
  alias: Omit<Alias, 'customResolver'> & {
    /** stringify of `Alias['find']` */
    findString: string
    /** relative path of `Alias['replacement']` */
    relative: string
  }
  import: {
    /** 
     * 1. what the user passes in is what it is
     * 2. always starts with alias or bare
     */
    importee: string
    importer: string
    /** always relative path */
    resolved: string
  }
}

/**
 * This is different from the resolve of Vite. Which only resolves `node_modules` and `alias` into relative paths.  
 * 这和 Vite 的 resolve 并不一样，它只是将 node_modules、alias 解析成相对路径  
 */
export class Resolve {

  constructor(
    private config: ResolvedConfig,
    private resolve = config.createResolver(),
  ) { }

  /**
   * Resolve the relative path of alias or bare(module)  
   * 解析 alias 或 bare(裸模块) 的相对路径  
   */
  public async tryResolve(importee: string, importer: string): Promise<Resolved | undefined> {
    return await this.tryResolveAlias(importee, importer) || this.tryResolveBare(importee, importer)
  }

  private async tryResolveAlias(importee: string, importer: string): Promise<Resolved | undefined> {
    const { importee: ipte, importeeRaw = ipte } = this.parseImportee(importee)

    // It may not be elegant here, just to look consistent with the behavior of the Vite
    // Maybe this means support for `alias.customResolver`
    const resolvedId = await this.resolve(ipte, importer, true)
    if (!resolvedId) return

    const alias = this.config.resolve.alias.find(
      a => a.find instanceof RegExp
        ? a.find.test(ipte)
        // https://github.com/rollup/plugins/blob/8fadc64c679643569239509041a24a9516baf340/packages/alias/src/index.ts#L16
        : ipte.startsWith(a.find + /* 🚧-④ */'/')
    )

    if (!alias) return
    
    const { find } = alias
    const replacement = normalizePath(alias.replacement)

    const findString = find instanceof RegExp
      ? find.exec(importee)![0]
      : find

    const relativePath = replacement.startsWith('.')
      ? replacement
      : relativeify(path.posix.relative(normalizePath(path.dirname(importer)), replacement))

    const resolvedAlias: Resolved['alias'] = {
      ...alias,
      findString,
      relative: findString.endsWith('/')
        ? (relativePath.endsWith('/') ? relativePath : relativePath + '/')
        : relativePath,
    }

    return {
      type: 'alias',
      ...this.resolveAlias(importeeRaw, importer, resolvedAlias),
    }
  }

  private tryResolveBare(importee: string, importer: string): Resolved | undefined {
    const { importee: ipte, importeeRaw = ipte } = this.parseImportee(importee)

    // it's relative or absolute path
    if (/^[\.\/]/.test(ipte)) {
      return
    }

    // Based on the `importer` lookup can be compatible symbolic-link(pnpm)
    const normalizedImporter = normalizePath(importer)
    const node_modules_paths = find_node_modules(normalizedImporter)

    const paths = ipte.split('/')
    let level = ''
    let find: string | undefined, replacement!: string

    // Find the last level of effective path step by step
    let p: string | undefined; while (p = paths.shift()) {
      level = path.posix.join(level, p)
      for (const node_modules of node_modules_paths) {
        const fullPath = path.join(node_modules, level)
        if (fs.existsSync(fullPath)) {
          find = level
          const relativePath = relativeify(
            path.posix.relative(
              normalizePath(path.dirname(importer)), 
              node_modules))
          // Nearest path and node_modules sibling
          // e.g. `ui-lib/${theme}/style.css` -> `./node_modules/ui-lib/${theme}/style.css`
          replacement = `${relativePath}/${level}`
          break
        }
      }
    }

    if (!find) return

    // Fake the bare module of node_modules into alias, and `replacement` here is a relative path
    const alias: Resolved['alias'] = {
      find,
      replacement,
      findString: find,
      relative: replacement.startsWith('.')
        ? replacement
        : relativeify(
            path.posix.relative(
              normalizePath(path.dirname(importer)), 
              replacement)),
    }

    return {
      type: 'bare',
      ...this.resolveAlias(importeeRaw, importer, alias)
    }
  }

  private resolveAlias(
    importee: string,
    importer: string,
    alias: Resolved['alias'],
  ): Omit<Resolved, 'type'> {
    const { find } = alias
    const replacement = normalizePath(alias.replacement)
    let {
      importee: ipte,
      importeeRaw = ipte,
      startQuotation = '',
    } = this.parseImportee(importee)

    if (replacement.startsWith('.')) {
      // relative path
      ipte = ipte.replace(find, replacement)
    } else {
      // compatible with vite restrictions
      // https://github.com/vitejs/vite/blob/v2.9.15/packages/vite/src/node/plugins/importAnalysis.ts#L714-L717 - 2.x
      const relativePath = relativeify(path.posix.relative(
        // Usually, the `replacement` we use is the directory path
        // So we also use the `path.dirname` path for calculation
        normalizePath(path.dirname(/* 🚧-① */importer)),
        replacement,
      ))
      ipte = ipte.replace(find instanceof RegExp ? find : find + /* 🚧-④ */'/', '')
      ipte = `${relativePath}/${ipte}`
    }

    return {
      alias,
      import: {
        importee: importeeRaw,
        importer,
        resolved: startQuotation + ipte,
      },
    }
  }

  private parseImportee(importee: string) {
    const result: {
      importee: string
      importeeRaw?: string
      startQuotation?: string
    } = { importee }
    if (/^[`'"]/.test(importee)) {
      result.importee = importee.slice(1)
      result.importeeRaw = importee
      result.startQuotation = importee.slice(0, 1)
      // Why not `endQuotation`? May be parse `endQuotation` is meaningless
      // e.g. `import('./foo/' + path)`
    }
    return result
  }
}
