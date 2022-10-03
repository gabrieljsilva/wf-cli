import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Credentials, User } from '../../config/database/postgres/entities';
import { UserService } from './user.service';
import {
  CurrentUserCredentials,
  RequirePermissions,
} from '../../shared/decorators';
import { ActivateUserDTO, CreateUserDTO } from './types';
import { Permission } from '../../shared/constants/permissions';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Mutation(() => User)
  async createUser(@Args('data') createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Mutation(() => User)
  async activateUser(@Args('data') activateUserDTO: ActivateUserDTO) {
    return this.userService.activateUser(activateUserDTO);
  }

  @RequirePermissions(Permission.GET_USERS)
  @Query(() => [User])
  async findUsers() {
    return this.userService.findUsers();
  }

  @RequirePermissions(Permission.GET_USERS)
  @Query(() => User)
  async whoAmI(@CurrentUserCredentials() credentials: Credentials) {
    return this.userService.findUserByCredentialsId(credentials.id);
  }
}
