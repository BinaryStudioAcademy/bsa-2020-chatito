import {MigrationInterface, QueryRunner} from "typeorm";

export class addIntegrations1599042348312 implements MigrationInterface {
    name = 'addIntegrations1599042348312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "integration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_f348d4694945d9dc4c7049a178a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD "integration" uuid`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_2021f48c775a19d453648b70fcc" FOREIGN KEY ("integration") REFERENCES "integration"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_2021f48c775a19d453648b70fcc"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "integration"`);
        await queryRunner.query(`DROP TABLE "integration"`);
    }

}
