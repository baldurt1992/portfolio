import { appendFile, glob, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const packageJsonPaths = []
for await (const packageJsonPath of glob('node_modules/**/brace-expansion/package.json')) {
  packageJsonPaths.push(packageJsonPath)
}

if (packageJsonPaths.length === 0) {
  throw new Error('Could not find an installed brace-expansion package')
}

const marker = 'BALDURDEV_LEGACY_CALLABLE_EXPORT'
let patchedCount = 0

for (const packageJsonPath of packageJsonPaths) {
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'))
  if (!String(packageJson.version).startsWith('5.')) {
    throw new Error(`Expected brace-expansion 5.x, found ${packageJson.version}`)
  }

  const commonJsEntry = join(dirname(packageJsonPath), 'dist/commonjs/index.js')
  const source = await readFile(commonJsEntry, 'utf8')

  if (!source.includes(marker)) {
    await appendFile(
      commonJsEntry,
      `\n// ${marker}\nconst secureApi = module.exports\nmodule.exports = secureApi.expand\nObject.assign(module.exports, secureApi)\n`
    )
    patchedCount++
  }
}

console.log(`Patched ${patchedCount} brace-expansion 5.x CommonJS entr${patchedCount === 1 ? 'y' : 'ies'}`)
