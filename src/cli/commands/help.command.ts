import { ICommand } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      ${chalk.whiteBright('Программа для подготовки данных для REST API сервера.')}

      ${chalk.italic('Пример:')} ${chalk.whiteBright('cli.js')} ${chalk.cyanBright('--<command>')} ${chalk.yellowBright('[--arguments]')}

      ${chalk.italic('Команды:')}
       ${chalk.cyanBright('--version:')}                     ${chalk.italic.dim('# выводит номер версии')}
       ${chalk.cyanBright('--help:')}                        ${chalk.italic.dim('# печатает этот текст')}
       ${chalk.cyanBright('--import')} ${chalk.yellowBright('<path>')}:               ${chalk.italic.dim('# импортирует данные из TSV')}
       ${chalk.cyanBright('--generate')} ${chalk.yellowBright('<n> <path> <url>')}:   ${chalk.italic.dim('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
