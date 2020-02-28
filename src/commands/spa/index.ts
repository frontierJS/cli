import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

export default class New extends Command {
  static description = "Creates a new frontier spa-app";

  static examples = [
    `$ frontier new spa-app
    Creating new frontier structured spa!
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

    let actions = [
      `npx degit frontierjs/spa-template ${spaDir}`,
      `cd ${spaDir} && npm install`,
      `cp ${spaDir}/.env-example.js ${spaDir}/.env.js`,
      `echo 'SPA created! cd ${spaDir} and npm run dev'`,
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
