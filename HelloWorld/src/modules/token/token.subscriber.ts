import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Token } from '../../config/database/postgres/entities';

import { hash } from '../../shared/utils';

@EventSubscriber()
export class TokenSubscriber implements EntitySubscriberInterface<Token> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Token;
  }

  async beforeInsert(event: InsertEvent<Token>) {
    event.entity.token = await hash(event.entity.token);
  }
}
