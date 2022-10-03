import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TOKEN_STATUS, TOKEN_TYPES } from '../../../../shared/constants';
import { User } from './Users';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ enum: TOKEN_TYPES })
  type: TOKEN_TYPES;

  @Column({ enum: TOKEN_STATUS })
  status: TOKEN_STATUS;

  @Column()
  token: string;

  @Column({ name: 'use_attempts' })
  useAttempts: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
