import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  createInsertRolesQuery,
  createRemoveRolesByNameQuery,
} from '../utils/roles';

export class PopulateRolesTable1662692500566 implements MigrationInterface {
  private roles = ['ADMIN'];
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const role of this.roles) {
      await queryRunner.query(createInsertRolesQuery(role));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const role of this.roles) {
      await queryRunner.query(createRemoveRolesByNameQuery(role));
    }
  }
}
