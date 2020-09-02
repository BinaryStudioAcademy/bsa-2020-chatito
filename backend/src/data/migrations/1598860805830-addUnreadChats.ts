import {MigrationInterface, QueryRunner} from "typeorm";

export class addUnreadChats1598860805830 implements MigrationInterface {
    name = 'addUnreadChats1598860805830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_unread_comments_comment" ("userId" uuid NOT NULL, "commentId" uuid NOT NULL, CONSTRAINT "PK_286adf7e4dc2787377429606e64" PRIMARY KEY ("userId", "commentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5286b208159bfb977c0bddfde" ON "user_unread_comments_comment" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f878c342a3d0b6ce7cef26b685" ON "user_unread_comments_comment" ("commentId") `);
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" ADD CONSTRAINT "FK_d5286b208159bfb977c0bddfde2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" ADD CONSTRAINT "FK_f878c342a3d0b6ce7cef26b685c" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" DROP CONSTRAINT "FK_f878c342a3d0b6ce7cef26b685c"`);
        await queryRunner.query(`ALTER TABLE "user_unread_comments_comment" DROP CONSTRAINT "FK_d5286b208159bfb977c0bddfde2"`);
        await queryRunner.query(`DROP INDEX "IDX_f878c342a3d0b6ce7cef26b685"`);
        await queryRunner.query(`DROP INDEX "IDX_d5286b208159bfb977c0bddfde"`);
        await queryRunner.query(`DROP TABLE "user_unread_comments_comment"`);
    }

}
