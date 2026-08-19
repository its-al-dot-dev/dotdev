import pc from 'picocolors'

export const log = {
  success: (msg: string) => console.log(pc.green('[✓]') + ' ' + msg),
  change: (msg: string) => console.log(pc.green('[•]') + ' ' + msg),
  add: (msg: string) => console.log(pc.green('[+]') + ' ' + msg),
  remove: (msg: string) => console.log(pc.red('[-]') + ' ' + msg),
  error: (msg: string) => console.error(pc.red('[✗]') + ' ' + pc.red(msg)),
  info: (msg: string) => console.log(pc.dim(msg)),
}
