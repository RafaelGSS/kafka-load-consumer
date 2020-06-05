#!/usr/bin/env node

import { execute } from './lib/cli.js'

function onFatalError (error) {
  console.error(error)
  process.exit(1)
}

async function main () {
  process.on('uncaughtException', onFatalError)
  process.on('unhandledRejection', onFatalError)

  if (process.argv.includes("--init")) {
    const config = await import('./lib/config-initializer.js')
    await config.initializeConfig()
    return;
  }

  await execute(process.argv || {})
}

main().catch(onFatalError)
