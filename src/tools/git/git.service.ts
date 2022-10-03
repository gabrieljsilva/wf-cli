import { Injectable } from '@nestjs/common';
import { simpleGit } from 'simple-git';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class GitService {
  async clone(repoUrl: string, name: string) {
    return new Promise((resolve, reject) => {
      simpleGit().clone(repoUrl, name, {}, async (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  async deleteRepository(path: string) {
    const repositoryPath = join(path, '/.git');
    fs.rmSync(repositoryPath, { recursive: true });
  }
}
