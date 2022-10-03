import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';

import { Credentials } from './Credentials';

import { USER_STATUS } from '../../../../shared/constants';
import { Role } from './Role';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'credentials_id' })
  credentialsId: string;

  @Field(() => Credentials)
  @OneToOne(() => Credentials)
  @JoinColumn({ name: 'credentials_id', referencedColumnName: 'id' })
  credentials: Credentials;

  @Field()
  @Column({ enum: USER_STATUS })
  status: USER_STATUS;

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
