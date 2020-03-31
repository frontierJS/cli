import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

export default class New extends Command {
  static description = "Creates a new frontier app";

  static examples = [
    `$ frontier new my-new-app
    Creating new frontier structured app!
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
    } = this.parse(New);

    if (!dir) {
      return this.log(`A project name is required to make app directory`);
    }
    let spaDir = dir + "/spa";
    let apiDir = dir + "/api";

    let actions = [
      `npx degit frontierjs/spa-template ${spaDir}`,
      `cd ${spaDir} && npm install`,
      `cp ${spaDir}/.env-example.js ${spaDir}/.env.js`,
      `echo 'SPA created! cd ${spaDir} and npm run dev'`,
      `npx degit frontierjs/api-template ${apiDir}`,
      `echo The API uses a version of sqlite that compiles the binaries...this will take 30 seconds`,
      `cp ${apiDir}/.env-example ${apiDir}/.env`,
      `echo 'Currenting use memory DB, set path to sqlite file in .env file'`,
      "sleep 5",
      `(cd ${apiDir} && npm install)`,
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
