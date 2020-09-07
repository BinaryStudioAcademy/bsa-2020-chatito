import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatMute1599467314311 implements MigrationInterface {
    name = 'ChatMute1599467314311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_muted_chats_chat" ("userId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "PK_f1f98af050d79de9e3d29f77063" PRIMARY KEY ("userId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1186a7d1051bc257663a5be92e" ON "user_muted_chats_chat" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_136f9ef6a18c710363380bfde5" ON "user_muted_chats_chat" ("chatId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "title" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying(103)`);
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" ADD CONSTRAINT "FK_1186a7d1051bc257663a5be92e3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" ADD CONSTRAINT "FK_136f9ef6a18c710363380bfde58" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" DROP CONSTRAINT "FK_136f9ef6a18c710363380bfde58"`);
        await queryRunner.query(`ALTER TABLE "user_muted_chats_chat" DROP CONSTRAINT "FK_1186a7d1051bc257663a5be92e3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "title" character varying(300)`);
        await queryRunner.query(`DROP INDEX "IDX_136f9ef6a18c710363380bfde5"`);
        await queryRunner.query(`DROP INDEX "IDX_1186a7d1051bc257663a5be92e"`);
        await queryRunner.query(`DROP TABLE "user_muted_chats_chat"`);
    }

}
