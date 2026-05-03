import { Migration } from '@mikro-orm/migrations';

export class Migration20260503063708 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `alter table "users" rename column "updated_ar" to "updated_at";`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(
      `alter table "users" rename column "updated_at" to "updated_ar";`,
    );
  }
}
