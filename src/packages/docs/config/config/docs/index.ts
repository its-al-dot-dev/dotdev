import doc from './config.json'
import code from './code'
import { buildDocConfig } from 'dotdev/studio'

export const config = buildDocConfig(doc, code)
