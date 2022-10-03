import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENV } from '../constants';
import { JwtPayload } from '../types';
import { RepoService } from '../../modules/repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly repoService: RepoService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.APP_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return await this.repoService.credentialsRepository.findOne(
      payload.credentialsId,
      {
        relations: ['user', 'user.roles', 'user.roles.permissions'],
      },
    );
  }
}
