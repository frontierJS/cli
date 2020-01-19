@frontierjs/frontier
====================

CLI for Frontier supported apps

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@frontierjs/frontier.svg)](https://npmjs.org/package/@frontierjs/frontier)
[![Downloads/week](https://img.shields.io/npm/dw/@frontierjs/frontier.svg)](https://npmjs.org/package/@frontierjs/frontier)
[![License](https://img.shields.io/npm/l/@frontierjs/frontier.svg)](https://github.com/jdkdev/frontier-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @frontierjs/cli
$ frontier COMMAND
running command...
$ frontier (-v|--version|version)
@frontierjs/cli/0.0.0-beta.0 linux-x64 node-v13.0.1
$ frontier --help [COMMAND]
USAGE
  $ frontier COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`frontier help [COMMAND]`](#frontier-help-command)
* [`frontier new [DIR]`](#frontier-new-dir)

## `frontier help [COMMAND]`

display help for frontier

```
USAGE
  $ frontier help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `frontier new [DIR]`

Creates a new frontier app

```
USAGE
  $ frontier new [DIR]

OPTIONS
  -d, --dry   Displays actions that will be run but will not execute them
  -h, --help  show CLI help

EXAMPLE
  $ frontier new my-new-app
       Creating new frontier structured app!
```

_See code: [src/commands/new.ts](https://github.com/frontierjs/frontier/blob/v0.0.0-beta.0/src/commands/new.ts)_
<!-- commandsstop -->
