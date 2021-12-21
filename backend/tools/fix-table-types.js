import { readFileSync, writeFileSync } from 'fs'

const dbTables = readFileSync('src/db/db-tables.d.ts', 'utf-8')

const fixedDbTables = dbTables.replaceAll(/(\w+?)(:.*?null)/g, '$1?$2')

writeFileSync('src/db/db-tables.d.ts', fixedDbTables, 'utf-8')
