import { execSync } from 'child_process'
import {Command, flags} from '@oclif/command'

export default class App extends Command {
  static description = 'Creates a new frontier app'

  static examples = [
    `$ frontier app my-new-project
Creating new app!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    dry: flags.boolean({char: 'd', description: 'Print actions that will be executed'}),
  }

  static args = [
      {name: 'dir'}
    ]

  async run() {
    const {args:{dir}, flags:{dry}} = this.parse(App)
    if (!dir) {
      return this.log(`A project name is required to make app directory`)
    }

    let actions = [
        `npx degit frontierjs/spa-template ${dir}`,
        `cd ${dir} && npm install`,
        `echo "App Created! cd ${dir} and npm run dev"`
    ]

    /**
     * Check if this is a dry run to log
     */
    let run = dry ? this.log : execSync

    /**
     * Run through actions checking for errors
     */
    actions.forEach(action => {
        run(action)
    })
  }
}
