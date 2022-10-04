import { PackageManagerCommand } from '../types';

export class NpmPackageManager implements PackageManagerCommand {
  installModules() {
    return 'npm install';
  }
}
