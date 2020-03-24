import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

export default class Api extends Command {
  static description = "Creates a new frontier API";

  static examples = [
    `$ frontier new api-app
    Creating new frontier structured api-app!
    `
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    dry: flags.boolean({
      char: "d",
      description: "Displays actions that will be run but will not execute them"
    })
  };

  static args = [{ name: "dir" }];

  async run() {
    const {
      args: { dir },
      flags: { dry }
    } = this.parse(Api);

    if (!dir) {
      return this.log(`A project name is required to make app directory`);
    }

    let apiDir = dir;

    let actions = [
      `npx degit frontierjs/api-template ${apiDir}`,
      `echo The API uses a version of sqlite that compiles the binaries...this will take 30 seconds`,
      `cd ${apiDir} && npm install`,
      `cp ${apiDir}/.env-example ${apiDir}/.env`,
      `echo 'Currenting use memory DB, set path to sqlite file in .env file'`,
      `echo 'API created! cd ${apiDir} and npm run dev'`
    ];

    /**
     * Run through actions checking for errors
     */
    actions.forEach(action => {
      this.log(action);
      if (!dry) execSync(action);
    });
  }
}
