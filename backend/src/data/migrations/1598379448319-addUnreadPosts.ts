import {MigrationInterface, QueryRunner} from "typeorm";

export class addUnreadPosts1598379448319 implements MigrationInterface {
    name = 'addUnreadPosts1598379448319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_076310128b7a66e7591db1822a1"`);
        await queryRunner.query(`CREATE TABLE "user_unread_posts_post" ("userId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_ffea8f441d36cdfe360e69bf20d" PRIMARY KEY ("userId", "postId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72aa66075d5b84b8ad5385371f" ON "user_unread_posts_post" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d090e7723c468e720cbeed5f2" ON "user_unread_posts_post" ("postId") `);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_076310128b7a66e7591db1822a1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" ADD CONSTRAINT "FK_72aa66075d5b84b8ad5385371fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" ADD CONSTRAINT "FK_6d090e7723c468e720cbeed5f29" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" DROP CONSTRAINT "FK_6d090e7723c468e720cbeed5f29"`);
        await queryRunner.query(`ALTER TABLE "user_unread_posts_post" DROP CONSTRAINT "FK_72aa66075d5b84b8ad5385371fc"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_076310128b7a66e7591db1822a1"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`DROP INDEX "IDX_6d090e7723c468e720cbeed5f2"`);
        await queryRunner.query(`DROP INDEX "IDX_72aa66075d5b84b8ad5385371f"`);
        await queryRunner.query(`DROP TABLE "user_unread_posts_post"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_076310128b7a66e7591db1822a1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
