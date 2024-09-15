#!/usr/bin/env node
import { CLIApplication, HelpCommand, VersionCommand, ImportCommand } from './cli/index.js';

const bootstrap = async () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  await cliApplication.processCommand(process.argv);
};

await bootstrap();
