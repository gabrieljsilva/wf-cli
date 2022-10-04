import { Injectable } from '@nestjs/common';
import {
  NpmPackageManager,
  YarnPackageManager,
} from './domain/package-managers';
import { PackageManagerCommand } from './domain/types';
import { PackageManager } from './domain/types/package-manager.enum';
import { exec } from 'child_process';
import { MAX_BUFFER_SIZE } from '../../shared/constants';

@Injectable()
export class PackageManagerService {
  public getPackageManager(manager: PackageManager): PackageManagerCommand {
    switch (manager) {
      case PackageManager.YARN:
        return new YarnPackageManager();
      case PackageManager.NPM:
        return new NpmPackageManager();
    }
  }

  public async installModules(path: string, manager = PackageManager.NPM) {
    const packageManager = this.getPackageManager(manager);

    if (!packageManager) {
      console.log(`manager: ${manager} not implemented yet`);
      process.exit(1);
    }

    return new Promise((resolve, reject) => {
      exec(
        packageManager.installModules(),
        { cwd: path, maxBuffer: MAX_BUFFER_SIZE },
        (error) => {
          error ? reject(error) : resolve(null);
        },
      );
    });
  }
}
