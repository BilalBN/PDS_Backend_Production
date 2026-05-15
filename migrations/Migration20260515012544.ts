import { Migration } from '@mikro-orm/migrations';

export class Migration20260515012544 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "products" ("id" serial primary key, "name" text not null, "created_at" timestamptz not null);`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "products" cascade;`);
  }
}
