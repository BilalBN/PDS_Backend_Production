import { Migration } from '@mikro-orm/migrations';

export class Migration20260516045132 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `alter table "batches" add "status" text not null default 'active';`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "batches" drop column "status";`);
  }
}
