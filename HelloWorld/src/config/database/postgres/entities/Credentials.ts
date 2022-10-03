import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CREDENTIALS_TYPE } from '../../../../shared/constants';
import { User } from './Users';

@ObjectType()
@Entity({ name: 'credentials' })
export class Credentials {
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.credentials)
  user: User;

  @Column({ enum: CREDENTIALS_TYPE })
  type: CREDENTIALS_TYPE;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
