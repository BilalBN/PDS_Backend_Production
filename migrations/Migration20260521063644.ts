import { Migration } from '@mikro-orm/migrations';

export class Migration20260521063644 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "parameters" ("id" serial primary key, "instructions" text null, "name" text not null, "type" text not null, "unit" text null, "sub_step_id" int null);`,
    );

    this.addSql(
      `alter table "parameters" add constraint "parameters_sub_step_id_foreign" foreign key ("sub_step_id") references "sub_steps" ("id") on delete set null;`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "parameters" cascade;`);
  }
}
