import {MigrationInterface, QueryRunner} from "typeorm";

export class addDraftPost1597670423451 implements MigrationInterface {
    name = 'addDraftPost1597670423451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "draft_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "createdByUserId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "UQ_8b81ae3983c2fd3a80e23f321c1" UNIQUE ("createdByUserId", "chatId"), CONSTRAINT "PK_542b7b541f23bc0c63e8de38b73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "draft_post" ADD CONSTRAINT "FK_0da4f4473018911b228a0659c3e" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draft_post" ADD CONSTRAINT "FK_de7a6cf8a9d40b9eea3c72de37e" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "draft_post" DROP CONSTRAINT "FK_de7a6cf8a9d40b9eea3c72de37e"`);
        await queryRunner.query(`ALTER TABLE "draft_post" DROP CONSTRAINT "FK_0da4f4473018911b228a0659c3e"`);
        await queryRunner.query(`DROP TABLE "draft_post"`);
    }

}
