import { readFileSync, writeFileSync } from 'fs'

let dbTables = readFileSync('src/db/db-tables.d.ts', 'utf-8')

// Make all nullable columns optional
dbTables = dbTables.replaceAll(/(\w+?)(:.*?null)/gm, '$1?$2')

// Replace all types of columns that ends in At with Date
dbTables = dbTables.replaceAll(/(\w+?At:) *\w+$/gm, '$1 Date')

writeFileSync('src/db/db-tables.d.ts', dbTables, 'utf-8')
