import { Migration } from '@mikro-orm/migrations';

export class Migration20260503061203 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(`create index "users_username_index" on "users" ("username");`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop index "users_username_index";`);
  }
}
