import { Migration } from '@mikro-orm/migrations';

export class Migration20260515025320 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "sub_steps" ("id" serial primary key, "name" text not null, "dynamic" boolean not null default false, "created_at" timestamptz not null, "main_step_id" int null);`,
    );

    this.addSql(
      `alter table "sub_steps" add constraint "sub_steps_main_step_id_foreign" foreign key ("main_step_id") references "main_steps" ("id") on delete set null;`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "sub_steps" cascade;`);
  }
}
