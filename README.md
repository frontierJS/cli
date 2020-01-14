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
$ npm install -g @frontierjs/frontier
$ frontier COMMAND
running command...
$ frontier (-v|--version|version)
@frontierjs/frontier/0.0.0-beta.0 linux-x64 node-v8.15.1
$ frontier --help [COMMAND]
USAGE
  $ frontier COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`frontier app [DIR]`](#frontier-app-dir)
* [`frontier help [COMMAND]`](#frontier-help-command)
* [`frontier new [FILE]`](#frontier-new-file)

## `frontier app [DIR]`

Creates a new frontier app

```
USAGE
  $ frontier app [DIR]

OPTIONS
  -d, --dry   Print actions that will be executed
  -h, --help  show CLI help

EXAMPLE
  $ frontier app my-new-project
  Creating new app!
```

_See code: [src/commands/app.ts](https://github.com/jdkdev/frontier-cli/blob/v0.0.0-beta.0/src/commands/app.ts)_

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

## `frontier new [FILE]`

describe the command here

```
USAGE
  $ frontier new [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ frontier hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/new.ts](https://github.com/jdkdev/frontier-cli/blob/v0.0.0-beta.0/src/commands/new.ts)_
<!-- commandsstop -->
