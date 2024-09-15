export const parseCommand = (cliArgs: string[]): Record<string, string[]> => {
  const parsedCommand: Record<string, string[]> = {};
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
};
