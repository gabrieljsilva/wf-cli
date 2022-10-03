import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RepoService } from '../repositories';
import { UserService } from '../user';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly repoService: RepoService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async verifyIfCredentialsExistsByEmail(email: string) {
    return (
      (await this.repoService.credentialsRepository.count({
        where: {
          email: email,
        },
      })) > 0
    );
  }
}
