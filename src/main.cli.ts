#!/usr/bin/env node
import 'reflect-metadata';

import { CLIApplication, HelpCommand, VersionCommand, ImportCommand } from './cli/index.js';
import { GenerateCommand } from './cli/commands/generate.command.js';

const bootstrap = async () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  await cliApplication.processCommand(process.argv);
};

await bootstrap();
