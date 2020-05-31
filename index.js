#!/usr/bin/env node

const { execute } = require('./lib/cli')

function onFatalError (error) {
  console.error(error)
  process.exit(1)
}

async function main () {
  process.on('uncaughtException', onFatalError)
  process.on('unhandledRejection', onFatalError)

  await execute(process.argv || {})
}

main().catch(() => process.exit())
