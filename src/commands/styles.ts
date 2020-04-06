import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

const Toolbelt = require("@frontierjs/toolbelt");
const env = Toolbelt.env;

export default class Styles extends Command {
  static description = "Search style guide";

  static examples = [
    `$ frontier styles center
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
    } = this.parse(Styles);
    let result;
    let command = `lynx --dump https://raw.githubusercontent.com/frontierJS/spa-template/master/scss/index.scss`;
    let query = `rg ${search} -C3`;

    /**
     * Run through actions checking for errors
     */
    if (!search) {
      result = execSync(command).toString();
      console.log(result);
      return;
    }

    result = execSync(`${command} | ${query}`).toString();
    console.log(result);
  }
}
