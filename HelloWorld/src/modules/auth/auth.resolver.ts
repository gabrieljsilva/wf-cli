import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessToken, LoginDTO } from './types';

@Resolver()
export class AuthResolver {
  private logger: Logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger();
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Mutation(() => AccessToken)
  async login(@Args('data') loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
