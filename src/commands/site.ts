import { execSync } from "child_process";
import { resolve } from "path";
import { Command, flags } from "@oclif/command";
// import Toolbelt from "@frontierjs/toolbelt"; look at trello for fix
const Toolbelt = require("@frontierjs/toolbelt");
const env = Toolbelt.env;

export default class Site extends Command {
  static description = `Creates a new nginx conf and dir for site on remote server
      Uses SITE_NAME and DOMAIN in .env or api/.env
    `;

  static examples = [
    `$ frontier site
    creates SITE_NAME.DOMAIN directory on server
    example.mydomain.com
    `,
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    dry: flags.boolean({
      char: "d",
      description:
        "Displays actions that will be run but will not execute them",
    }),
    api: flags.boolean({
      char: "a",
      description: "Creates a placeholder for api using a template api file",
    }),
    excludeDb: flags.boolean({
      char: "e",
      description: "Excludes creation of sqlite database on server",
    }),
  };

  static args = [];

  async run() {
    const {
      flags: { dry, excludeDb, api },
    } = this.parse(Site);

    const domain = env.get("DOMAIN", "notset: DOMAIN");
    const app = env.get("SITE_NAME", "notset: SITE_NAME");
    const port = env.get("PORT", "notset: PORT");
    const SERVER = env.get("SERVER", "notset: SERVER");

    const tmploc = env.get("TEMPLOC");
    const template = resolve(
      __dirname + "/../storage/templates/nginx_template.conf"
    );

    const genPath = resolve(__dirname + "/../storage/generated");
    const file = genPath + "/" + app + "_nginx.conf";

    const site = app + "." + domain;
    const serverFile = site;

    let actions = [
      `echo 'Creating nginx and index files'`,
      `cp ${template} ${file}`,
      `echo '${app} future site' > ${genPath}/index.html`,
      `echo 'Customizing nginx file based on vars'`,
      `sed -i 's/{APP}/${app}/' ${file}`,
      `sed -i 's/{DOMAIN}/${domain}/' ${file}`,
      `sed -i 's/{PORT}/${port}/' ${file}`,

      `echo 'Creating directory on server'`,
      `ssh ${SERVER} mkdir -p /home/forge/${site}/dist`,
      `ssh ${SERVER} touch /home/forge/${site}/dist/index.html`,
      `scp ${genPath}/index.html ${SERVER}:/home/forge/${site}/dist/.`,
      // `ssh ${SERVER} ln -s /home/forge/${site}/dist/index.html /home/forge/${site}/index.html`,

      `echo 'Activating nginx and restarting nginx'`,
      `scp ${file} ${SERVER}:${tmploc}/${serverFile}`,
      `ssh ${SERVER} sudo mv ${tmploc}/${serverFile} /etc/nginx/sites-available`,
      `ssh ${SERVER} sudo ln -s /etc/nginx/sites-available/${serverFile} /etc/nginx/sites-enabled/${serverFile}`,
      `ssh ${SERVER} sudo service nginx restart`,
    ];

    if (api) {
      let actionsApi = [
        `echo '******Creating API placeholder'`,
        `ssh ${SERVER} "tar xvf ${tmploc}/template-api.tar.gz -C /home/forge/${site}"`,
        `ssh ${SERVER} "cp ${tmploc}/.env-example /home/forge/${site}/.env"`,
        `echo 'Running NPM install'`,
        `ssh ${SERVER} "cd /home/forge/${site} && npm install"`,
        `echo 'Starting Api'`,
        `ssh ${SERVER} "pm2 start /home/forge/${site}/api.js --name ${site} -a"`,
        `echo 'Print status'`,
        `ssh ${SERVER} "pm2 ps"`,
      ];
      actions.push(...actionsApi);
      if (!excludeDb) {
        actions.push(`ssh ${SERVER} mkdir -p /home/forge/db/${site}`);
        actions.push(
          `ssh ${SERVER} cp /home/forge/db/template/db.sqlite /home/forge/db/${site}`
        );
      }
    }

    // Cloudflare Step
    const SERVER_IP = env.get("SERVER_IP", "notset");
    if (app && SERVER_IP) {
      actions.push(`echo To create alias in Cloudflare`);
      actions.push(`echo "cfcli -a -t A add ${app} ${SERVER_IP}"`);
    }

    actions.push(`echo 'Site Creation done'`);

    /**
     * Run through actions checking for errors
     */
    actions.forEach((action) => {
      // this.log(process.env);
      if (action.includes("notset")) {
        this.warn("Cannot run this command");
        this.log(action);
        return this.error("Check .env file");
      }

      this.log(action);
      if (!dry) execSync(action);
    });
  }
}
