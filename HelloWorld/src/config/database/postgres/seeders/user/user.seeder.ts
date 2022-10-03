import { Credentials, User } from '../../entities';
import { BaseSeeder } from '../../../../../shared/types';
import { Connection } from 'typeorm';
import { CREDENTIALS_TYPE, USER_STATUS } from '../../../../../shared/constants';

export class SeedUser extends BaseSeeder<User> {
  protected constructor(connection: Connection) {
    super(connection, [
      {
        userName: 'admin',
        status: USER_STATUS.ACTIVE,
        credentials: {
          email: 'admin@email.com',
          password: '12345678',
          type: CREDENTIALS_TYPE.USER,
        } as Credentials,
      },
    ]);
  }

  public async seed() {
    const userRepository = await this.connection.getRepository(User);
    const credentialsRepository = await this.connection.getRepository(
      Credentials,
    );

    for (const entity of this.entities) {
      const user = await userRepository.findOne({
        where: {
          userName: entity.userName,
        },
      });
      if (user) continue;
      let credentials = await credentialsRepository.findOne({
        where: {
          email: entity.credentials.email,
        },
      });
      credentials ||= await credentialsRepository.save(entity.credentials);
      entity.credentials = credentials;
      await userRepository.save(entity);
    }
  }
}
