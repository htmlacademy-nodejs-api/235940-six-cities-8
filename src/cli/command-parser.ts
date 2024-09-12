type TParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArgs: string[]): TParsedCommand {
    const parsedCommand: TParsedCommand = {};
    let currentCommand = '';

    for (const argument of cliArgs) {
      if (argument.startsWith('--')) {
        parsedCommand[argument] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        parsedCommand[currentCommand].push(argument);
      }
    }

    return parsedCommand;
  }
}
