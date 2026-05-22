import { Migration } from '@mikro-orm/migrations';

export class Migration20260521070826 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(`alter table "parameters" alter column "type" drop not null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "parameters" alter column "type" set not null;`);
  }
}
