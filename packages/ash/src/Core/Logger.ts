import chalk from 'chalk'

export class Logger {
  private static console(text: string) {
    console.log(`  ${text}  `)
  }

  static log(processName: string, state: 'success' | 'failed', time?: number) {
    let stateMessage = `${time === undefined ? '' : time + 'ms '}${
      state === 'success' ? 'DONE' : 'FAILED'
    }`
    let count = process.stdout.columns - 6 - processName.length - stateMessage.length

    let dots: string = ''

    for (let i = 0; i < count; i++) {
      dots += '.'
    }

    Logger.console(
      `${processName} ${dots} ${
        state === 'success' ? chalk.green(stateMessage) : chalk.red(stateMessage)
      }`,
    )
  }

  static title(title: string, state: 'success' | 'danger' | 'info' = 'info') {
    let tag = chalk.cyan('INFO')

    if (state === 'danger') {
      tag = chalk.green('SUCCESS')
    }

    if (state === 'success') {
      tag = chalk.green('FAILED')
    }

    console.log('\n')
    Logger.console(`${tag}  ${title}`)
    console.log('\n')
  }
}
