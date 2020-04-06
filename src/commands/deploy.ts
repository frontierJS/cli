import { execSync } from "child_process";
import { Command, flags } from "@oclif/command";
// import Toolbelt from "@frontierjs/toolbelt"; look at trello for fix
const Toolbelt = require("@frontierjs/toolbelt");
const env = Toolbelt.env;

export default class Deploy extends Command {
  static description = "Deploys a site to remote server";

  static examples = [
    `$ frontier deploy demo -s
    -a --api //api 
    -s --spa //spa
    `
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    dry: flags.boolean({
      char: "d",
      description: "Displays actions that will be run but will not execute them"
    }),
    api: flags.boolean({
      char: "a",
      description: "Deploy the API"
    }),
    spa: flags.boolean({
      char: "s",
      description: "Deploy the SPA"
    })
  };

  static args = [
    {
      name: "app",
      description:
        "This will be used for the subdomain and folder name on server"
    }
  ];

  async run() {
    const {
      args: { app },
      flags: { dry, api, spa }
    } = this.parse(Deploy);

    const SERVER = env.get("SERVER", "notset");
    const tmploc = env.get("TEMPLOC");
    const domain = env.get("DOMAIN");

    const site = app + "." + domain;
    const spaFile = app + "-spa.tar.gz";
    const apiFile = app + "-api.tar.gz";

    let actions = [];

    if (spa) {
      let actionsSpa = [
        `echo 'Packaging SPA'`,
        `NAME=${app} npm run pack`,
        `echo 'Transfering spa to server'`,
        `scp ${spaFile} ${SERVER}:${tmploc}`,
        `echo 'unziping file'`,
        `ssh ${SERVER} "tar xvf ${tmploc}/${spaFile} -C /home/forge/${site}/dist"`
      ];

      actions.push(...actionsSpa);
      actions.push(`echo 'Deploy SPA done'`);
    }

    if (api) {
      let actionsApi = [
        `echo 'Packaging API'`,
        `NAME=${app} npm run pack`,
        `echo 'Transfering API to server'`,
        `scp ${apiFile} ${SERVER}:${tmploc}`,
        `echo 'Pausing app'`,
        `ssh ${SERVER} "pm2 stop ${site}"`,
        `echo 'unziping file'`,
        `ssh ${SERVER} "tar xvf ${tmploc}/${apiFile} -C /home/forge/${site}"`,
        `echo 'Running NPM install'`,
        `ssh ${SERVER} "cd /home/forge/${site} && npm install"`,
        `echo 'Restarting App'`,
        `ssh ${SERVER} "pm2 restart ${site} -a"`,
        `echo 'Print status'`,
        `ssh ${SERVER} "pm2 ps"`
      ];

      actions.push(...actionsApi);
      actions.push(`echo 'Deploy API done'`);
    }

    /**
     * Run through actions checking for errors
     */
    actions.forEach(action => {
      this.log(action);
      if (!dry) execSync(action);
    });
  }
}

// Notes for API side
//  1127  pm2 ps
//  1128  pm2 stop auth
//  1131  cp auth.knight.works/.env auth.env
//  1133  rm -r auth.knight.works/
//  1134  mkdir auth.knight.works
//  1135  mv auth.env auth.knight.works/.env
//  1141  mkdir auth.knight.works/dist
//  1142  tar xvf ~/tmp/build.tar.gz -C auth.knight.works/dist
//  1143  la auth.knight.works/dist/
//  1144  cd auth.knight.works/
//  1149  npm install
//  1159  node src/server.js
//  1166  pm2 delete auth
//  1168  pm2 start src/server.js --name auth.knight.works
//  1169  pm2 ps
//  1173  pm2 restart auth.knight.works
