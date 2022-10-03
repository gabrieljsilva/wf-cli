import { Injectable } from '@nestjs/common';
import { simpleGit } from 'simple-git';

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
}
