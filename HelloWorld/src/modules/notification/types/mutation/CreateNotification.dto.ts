import { Field, InputType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@InputType()
export class CreateNotificationDto {
  @Field()
  key: string;

  @Field(() => [String])
  targets: string[];

  @Field(() => JSON, { nullable: true })
  variables?: Record<string, string | boolean | number>;
}
