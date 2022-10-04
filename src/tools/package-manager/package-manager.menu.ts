import { Question, QuestionSet } from 'nest-commander';
import { Menu } from '../../shared/types';
import { PackageManager } from './domain/types/package-manager.enum';
import { sentenceCase } from '../../shared/utils';

@QuestionSet({
  name: Menu.SELECT_PACKAGE_MANAGER,
})
export class PackageManagerMenu {
  @Question({
    name: 'packageManager',
    type: 'list',
    choices: Object.values(PackageManager).map((packageManager) => ({
      name: sentenceCase(packageManager),
      value: packageManager,
    })),
    default: PackageManager.NPM,
    message: 'Select your preferred package manager:',
  })
  parsePackageManager(value: PackageManager) {
    return value;
  }
}
