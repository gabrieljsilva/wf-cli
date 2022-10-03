import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class ScaffolderService {
  async installModules(path: string) {
    return new Promise((resolve, reject) => {
      exec(`npm install`, { cwd: path }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }

        if (stderr) {
          console.log(`stdout: ${stdout}`);
          reject(stderr);
        }

        console.log(`stdout: ${stdout}`);

        resolve(null);
      });
    });
  }
}
