import {MigrationInterface, QueryRunner} from "typeorm";

export class addDraftComment1597676244823 implements MigrationInterface {
    name = 'addDraftComment1597676244823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "draft_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "createdByUserId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "UQ_b25f34dcce73e1e5bdc62203789" UNIQUE ("createdByUserId", "postId"), CONSTRAINT "PK_0f0f0a50906028687677d5a7f49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_df88c69827aba0264e95f50af90" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_df88c69827aba0264e95f50af90"`);
        await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5"`);
        await queryRunner.query(`DROP TABLE "draft_comment"`);
    }

}
