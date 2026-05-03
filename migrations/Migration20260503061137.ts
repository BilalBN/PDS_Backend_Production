import { Migration } from '@mikro-orm/migrations';

export class Migration20260503061137 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "users" ("id" serial primary key, "email" text null, "password" text not null, "phone" text null, "role" text not null, "status" text not null default 'active', "username" text not null, "created_at" timestamptz not null, "updated_ar" timestamptz null);`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );
    this.addSql(
      `alter table "users" add constraint "users_phone_unique" unique ("phone");`,
    );
  }
}
