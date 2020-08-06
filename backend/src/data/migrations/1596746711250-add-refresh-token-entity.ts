import {MigrationInterface, QueryRunner} from "typeorm";

export class addRefreshTokenEntity1596746711250 implements MigrationInterface {
    name = 'addRefreshTokenEntity1596746711250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" bigint NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
