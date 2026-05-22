import { Migration } from '@mikro-orm/migrations';

export class Migration20260521103217 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table \`products\` (\`id\` int unsigned not null auto_increment primary key, \`name\` text not null, \`created_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    );

    this.addSql(
      `create table \`main_steps\` (\`id\` int unsigned not null auto_increment primary key, \`name\` text not null, \`created_at\` datetime not null, \`product_id\` int unsigned null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`main_steps\` add index \`main_steps_product_id_index\` (\`product_id\`);`,
    );

    this.addSql(
      `create table \`sub_steps\` (\`id\` int unsigned not null auto_increment primary key, \`name\` text not null, \`dynamic\` tinyint(1) not null default false, \`created_at\` datetime not null, \`main_step_id\` int unsigned null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`sub_steps\` add index \`sub_steps_main_step_id_index\` (\`main_step_id\`);`,
    );

    this.addSql(
      `create table \`parameters\` (\`id\` int unsigned not null auto_increment primary key, \`instructions\` text null, \`name\` text not null, \`type\` text null, \`unit\` text null, \`sub_step_id\` int unsigned null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`parameters\` add index \`parameters_sub_step_id_index\` (\`sub_step_id\`);`,
    );

    this.addSql(
      `create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`email\` text null, \`password\` text not null, \`phone\` text null, \`role\` text not null, \`status\` text not null default ('active'), \`username\` text not null, \`created_at\` datetime not null, \`updated_at\` datetime null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`users\` add unique \`users_email_unique\` (\`email\`);`,
    );
    this.addSql(
      `alter table \`users\` add unique \`users_phone_unique\` (\`phone\`);`,
    );
    this.addSql(
      `alter table \`users\` add index \`users_username_index\` (\`username\`);`,
    );

    this.addSql(
      `create table \`batches\` (\`id\` int unsigned not null auto_increment primary key, \`name\` text not null, \`size\` int not null, \`expiry_date\` datetime not null, \`start_date\` datetime not null, \`end_date\` datetime not null, \`status\` text not null default ('active'), \`created_at\` datetime not null, \`created_by_id\` int unsigned null, \`supervised_by_id\` int unsigned null, \`product_id\` int unsigned null) default character set utf8mb4 engine = InnoDB;`,
    );
    this.addSql(
      `alter table \`batches\` add index \`batches_name_index\` (\`name\`);`,
    );
    this.addSql(
      `alter table \`batches\` add index \`batches_created_by_id_index\` (\`created_by_id\`);`,
    );
    this.addSql(
      `alter table \`batches\` add index \`batches_supervised_by_id_index\` (\`supervised_by_id\`);`,
    );
    this.addSql(
      `alter table \`batches\` add index \`batches_product_id_index\` (\`product_id\`);`,
    );

    this.addSql(
      `alter table \`main_steps\` add constraint \`main_steps_product_id_foreign\` foreign key (\`product_id\`) references \`products\` (\`id\`) on delete set null;`,
    );

    this.addSql(
      `alter table \`sub_steps\` add constraint \`sub_steps_main_step_id_foreign\` foreign key (\`main_step_id\`) references \`main_steps\` (\`id\`) on delete set null;`,
    );

    this.addSql(
      `alter table \`parameters\` add constraint \`parameters_sub_step_id_foreign\` foreign key (\`sub_step_id\`) references \`sub_steps\` (\`id\`) on delete set null;`,
    );

    this.addSql(
      `alter table \`batches\` add constraint \`batches_created_by_id_foreign\` foreign key (\`created_by_id\`) references \`users\` (\`id\`) on delete set null;`,
    );
    this.addSql(
      `alter table \`batches\` add constraint \`batches_supervised_by_id_foreign\` foreign key (\`supervised_by_id\`) references \`users\` (\`id\`) on delete set null;`,
    );
    this.addSql(
      `alter table \`batches\` add constraint \`batches_product_id_foreign\` foreign key (\`product_id\`) references \`products\` (\`id\`) on delete set null;`,
    );
  }
}
