import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Notification } from './Notification';

@ObjectType()
@Entity('notifications_sent')
export class NotificationSent {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'is_read' })
  isRead: boolean;

  @Field()
  @Column({ name: 'credentials_id' })
  credentialsId: string;

  @Field()
  @Column({ name: 'notification_id' })
  notificationId: string;

  @Field(() => Notification)
  @ManyToOne(() => Notification)
  @JoinColumn({ name: 'notification_id', referencedColumnName: 'id' })
  notification: Notification;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
