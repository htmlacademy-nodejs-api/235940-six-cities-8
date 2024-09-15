import { ICommand } from './commands/types/command.interface.js';
import { parseCommand } from './commands/utils/parse-command.util.js';

export class CLIApplication {
  private readonly commands: Record<string, ICommand> = {};

  constructor(
    private readonly defaultCommand: string = '--help',
  ) {}

  public registerCommands(commandList: ICommand[]): void {
    commandList.reduce((acc, command) => {
      const commandName = command.getName();
      if (acc[commandName]) {
        throw new Error(`Command ${commandName} is already registered`);
      }
      acc[commandName] = command;
      return acc;
    }, this.commands);
  }

  public getDefaultCommand(): ICommand {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): ICommand {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public async processCommand(argv: string[]): Promise<void> {
    const parsedCommand = parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const commandArguments = parsedCommand[commandName] ?? [];
    await this.getCommand(commandName).execute(...commandArguments);
  }
}
