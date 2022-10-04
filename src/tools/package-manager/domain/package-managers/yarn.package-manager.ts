import { PackageManagerCommand } from '../types';

export class YarnPackageManager implements PackageManagerCommand {
  installModules() {
    return 'yarn';
  }
}
