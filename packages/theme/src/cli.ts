#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { css } from './commands/css'
import { tokens } from './commands/tokens'

const main = defineCommand({
  meta: {
    name: 'dotdev-theme',
    version: '1.0.0',
    description: 'Build tools for @dotdev/theme',
  },
  subCommands: {
    css,
    tokens,
  },
})

runMain(main)
