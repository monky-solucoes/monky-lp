import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'

const pastaCache = resolve(process.cwd(), '.next')

await rm(pastaCache, { recursive: true, force: true })
