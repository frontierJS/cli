import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

const Toolbelt = require("@frontierjs/toolbelt");
const env = Toolbelt.env;

export default class Env extends Command {
  static description = "Displays ENV vars";

  static examples = [
    `$ frontier env
    `,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    dry: flags.boolean({
      char: "d",
      description:
        "Displays actions that will be run but will not execute them",
    }),
  };

  static args = [{ name: "search" }];

  async run() {
    const {
      args: { search },
      flags: { dry },
    } = this.parse(Env);

    let result = env.getAll();
    let query = `rg ${search} -C3`;
    if (!search) {
      console.log(result);
      console.log("Use | rg {search}");
      return;
    }

    // result = execSync(
    //   ` echo "${JSON.stringify(result)}" | ${query}`
    // ).toString();
    // console.log(result);

    /**
     * Run through actions checking for errors
     */
    // actions.forEach((action) => {
    //   this.log(action);
    //   if (!dry) execSync(action);
    // });
  }
}
