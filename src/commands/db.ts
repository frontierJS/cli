import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

const Toolbelt = require("@frontierjs/toolbelt");
const env = Toolbelt.env;

export default class Db extends Command {
  static description = "Opens a project's sqlite DB";

  static examples = [
    `$ frontier db
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
    } = this.parse(Db);

    let sqlitePath = env.get("DB");

    let actions = [`sqlite3 ${sqlitePath}`];

    /**
     * Run through actions checking for errors
     */
    actions.forEach((action) => {
      this.log(action);
      if (!dry) execSync(action);
    });
  }
}
