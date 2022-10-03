import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { NotificationSent } from './NotificationSent';

@ObjectType()
@Entity('notifications')
export class Notification<T = any> {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field(() => JSON)
  @Column({ type: 'json' })
  payload: T;

  @Field()
  @Column({ name: 'template_id' })
  templateId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(
    () => NotificationSent,
    (notification) => notification.notification,
  )
  notificationsSent: NotificationSent[];

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
