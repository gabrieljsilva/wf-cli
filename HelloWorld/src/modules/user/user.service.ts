import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { RepoService } from '../repositories';
import { compare, generateRandomToken } from '../../shared/utils';
import {
  AlreadyExistsException,
  NotFoundException,
} from '../../shared/exceptions';
import {
  CREDENTIALS_TYPE,
  TOKEN_STATUS,
  TOKEN_TYPES,
  USER_STATUS,
} from '../../shared/constants';
import { MailerService } from '../mailer';
import { CredentialsService } from '../credentials';
import { ActivateUserDTO, CreateUserDTO } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly RepoService: RepoService,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => CredentialsService))
    private readonly CredentialsService: CredentialsService,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const credentialsAlreadyExists =
      await this.CredentialsService.verifyIfCredentialsExistsByEmail(dto.email);

    if (credentialsAlreadyExists) {
      throw new AlreadyExistsException('user', ['email']);
    }

    return this.connection.transaction(async (transaction) => {
      const credentials = this.RepoService.credentialsRepository.create({
        email: dto.email,
        password: dto.password,
        type: CREDENTIALS_TYPE.USER,
      });

      await transaction.save(credentials);

      const user = this.RepoService.userRepository.create({
        userName: dto.userName,
        credentials: credentials,
        status: USER_STATUS.UNCONFIRMED,
      });

      await transaction.save(user);

      const unHashedToken = await generateRandomToken(6);

      const token = this.RepoService.tokenRepository.create({
        userId: user.id,
        token: unHashedToken,
        type: TOKEN_TYPES.ACTIVATION_ACCOUNT,
        status: TOKEN_STATUS.UNUSED,
      });

      await transaction.save(token);

      await this.mailerService.sendEmail({
        subject: 'Confirme sua conta',
        templateIdOrKey: 'confirmAccount',
        variables: {
          userName: user.userName,
          token: unHashedToken,
        },
        targetsEmails: [credentials.email],
      });

      return user;
    });
  }

  async activateUser(dto: ActivateUserDTO) {
    const credentials = await this.RepoService.credentialsRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!credentials) throw new NotFoundException('user');

    const user = await this.RepoService.userRepository.findOne({
      where: {
        credentialsId: credentials.id,
      },
      relations: ['credentials'],
    });

    if (!user) throw new NotFoundException('user');

    const token = await this.RepoService.tokenRepository
      .createQueryBuilder()
      .where('user_id = :userId ', {
        userId: user.id,
      })
      .andWhere('status = :status', { status: TOKEN_STATUS.UNUSED })
      .andWhere('use_attempts < 3')
      .orderBy('created_at', 'DESC')
      .getOne();

    if (!token) throw new NotFoundException('token', ['token']);

    const tokenNotMatch = !(await compare(dto.token, token.token));

    token.useAttempts++;
    token.status = TOKEN_STATUS.USED;

    await this.RepoService.tokenRepository.save(token);

    if (tokenNotMatch) throw new NotFoundException('token');

    user.status = USER_STATUS.ACTIVE;

    await this.RepoService.userRepository.save(user);

    return user;
  }

  async findUsers() {
    return this.RepoService.userRepository.find({
      relations: ['credentials'],
      where: {
        status: USER_STATUS.ACTIVE,
      },
    });
  }

  async findUserByCredentialsId(credentialsId: string) {
    return this.RepoService.userRepository.findOne({
      where: {
        credentialsId: credentialsId,
      },
      relations: ['credentials'],
    });
  }
}
