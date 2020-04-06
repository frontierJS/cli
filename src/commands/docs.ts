import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

const Toolbelt = require("@frontierjs/toolbelt");
const env = Toolbelt.env;

export default class Docs extends Command {
  static description = "Gives links for helpful docs";

  static examples = [
    `$ frontier docs
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

  // static args = [{ name: "dir" }];

  async run() {
    const {
      flags: { dry },
    } = this.parse(Docs);

    let actions = [
      `echo Javascript`,
      `echo Svelte`,
      `echo "Node (& Express)"`,
      `echo Frontier`,
    ];

    /**
     * Run through actions checking for errors
     */
    actions.forEach((action) => {
      this.log(action);
      if (!dry) execSync(action);
    });
  }
}
