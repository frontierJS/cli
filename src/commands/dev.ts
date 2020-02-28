import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

export default class Dev extends Command {
  static description = "Starts Dev environment";

  static examples = [
    `$ frontier dev
    Go to localhost:yourport
    `
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    dry: flags.boolean({
      char: "d",
      description: "Displays actions that will be run but will not execute them"
    })
  };

  //static args = [{ name: "dir" }];

  async run() {
    const {
      //args: { dir },
      flags: { dry }
    } = this.parse(Dev);


    let actions = [
      `npm run dev`,
      `echo This is just running whatever is in package.json, feel free to change it there`,
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
