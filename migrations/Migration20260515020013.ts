import { Migration } from '@mikro-orm/migrations';

export class Migration20260515020013 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "main_steps" ("id" serial primary key, "name" text not null, "created_at" timestamptz not null, "product_id" int null);`,
    );

    this.addSql(
      `alter table "main_steps" add constraint "main_steps_product_id_foreign" foreign key ("product_id") references "products" ("id") on delete set null;`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "main_steps" cascade;`);
  }
}
