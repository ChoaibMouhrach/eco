import { ICommand } from '../../interfaces'
import { Command } from '../packages'

export class MakerCommand extends Command implements ICommand {
  public static commands: string[] = ["make:seeder"]

  public execute() { }
}
