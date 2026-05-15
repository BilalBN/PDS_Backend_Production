import { Migration } from '@mikro-orm/migrations';

export class Migration20260515071033 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "batches" ("id" serial primary key, "name" text not null, "size" int not null, "expiry_date" timestamptz not null, "start_date" timestamptz not null, "end_date" timestamptz not null, "created_at" timestamptz not null, "created_by_id" int null, "supervised_by_id" int null, "product_id" int null);`,
    );
    this.addSql(`create index "batches_name_index" on "batches" ("name");`);

    this.addSql(
      `alter table "batches" add constraint "batches_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on delete set null;`,
    );
    this.addSql(
      `alter table "batches" add constraint "batches_supervised_by_id_foreign" foreign key ("supervised_by_id") references "users" ("id") on delete set null;`,
    );
    this.addSql(
      `alter table "batches" add constraint "batches_product_id_foreign" foreign key ("product_id") references "products" ("id") on delete set null;`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "batches" cascade;`);
  }
}
