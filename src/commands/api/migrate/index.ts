import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";

export default class Migrate extends Command {
  static description = "Creates the database table for a Model";

  static examples = [
    `$ frontier migrate
    Creating database tables based on Model field definitions
    `
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    dry: flags.boolean({
      char: "d",
      description: "Displays actions that will be run but will not execute them"
    }),
    all: flags.boolean({
      char: "a",
      description: "This will create tables for all models"
    })
  };

  static args = [{ name: "models" }];

  async run() {
    const {
      args: { models },
      flags: { dry, all }
    } = this.parse(Migrate);

    if (!all && !models) {
      return this.log(`Need to list models to migrate or use the --all flag`);
    }

    let actions = [
      `echo need to figure this out`,
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
