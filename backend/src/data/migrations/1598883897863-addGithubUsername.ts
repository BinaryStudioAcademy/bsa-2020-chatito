import {MigrationInterface, QueryRunner} from "typeorm";

export class addGithubUsername1598883897863 implements MigrationInterface {
    name = 'addGithubUsername1598883897863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "githubUsername" character varying(100)`);
        await queryRunner.query(`ALTER TYPE "public"."chat_type_enum" RENAME TO "chat_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "chat_type_enum" AS ENUM('Channel', 'DirectMessage', 'GitHubRepository')`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "type" TYPE "chat_type_enum" USING "type"::"text"::"chat_type_enum"`);
        await queryRunner.query(`DROP TYPE "chat_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "chat_type_enum_old" AS ENUM('Channel', 'DirectMessage')`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "type" TYPE "chat_type_enum_old" USING "type"::"text"::"chat_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "chat_type_enum"`);
        await queryRunner.query(`ALTER TYPE "chat_type_enum_old" RENAME TO  "chat_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "githubUsername"`);
    }

}
