import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

import { Credentials } from '../../config/database/postgres/entities';

import { hash } from '../../shared/utils';

@EventSubscriber()
export class CredentialsSubscriber
  implements EntitySubscriberInterface<Credentials>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Credentials;
  }

  async beforeInsert(event: InsertEvent<Credentials>) {
    event.entity.password = await hash(event.entity.password);
  }
}
