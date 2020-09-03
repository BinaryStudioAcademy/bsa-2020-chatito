import {MigrationInterface, QueryRunner} from "typeorm";

export class addGithubIntegration1599134195253 implements MigrationInterface {
    name = 'addGithubIntegration1599134195253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_86cd7233f4ecb768ac6a61ff6dd"`);
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_a203c89575b504a6c51040658df"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_076310128b7a66e7591db1822a1"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "githubUsername" character varying(100)`);
        await queryRunner.query(`ALTER TYPE "public"."chat_type_enum" RENAME TO "chat_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "chat_type_enum" AS ENUM('Channel', 'DirectMessage', 'GithubRepository')`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "type" TYPE "chat_type_enum" USING "type"::"text"::"chat_type_enum"`);
        await queryRunner.query(`DROP TYPE "chat_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_a203c89575b504a6c51040658df" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_86cd7233f4ecb768ac6a61ff6dd" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_076310128b7a66e7591db1822a1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_076310128b7a66e7591db1822a1"`);
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_86cd7233f4ecb768ac6a61ff6dd"`);
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_a203c89575b504a6c51040658df"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`CREATE TYPE "chat_type_enum_old" AS ENUM('Channel', 'DirectMessage')`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "type" TYPE "chat_type_enum_old" USING "type"::"text"::"chat_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "chat_type_enum"`);
        await queryRunner.query(`ALTER TYPE "chat_type_enum_old" RENAME TO  "chat_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "githubUsername"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_076310128b7a66e7591db1822a1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_a203c89575b504a6c51040658df" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_86cd7233f4ecb768ac6a61ff6dd" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
