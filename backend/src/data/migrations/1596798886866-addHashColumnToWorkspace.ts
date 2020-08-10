import {MigrationInterface, QueryRunner} from "typeorm";

export class addHashColumnToWorkspace1596798886866 implements MigrationInterface {
    name = 'addHashColumnToWorkspace1596798886866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" ADD "hash" character varying(7) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "UQ_4c5a170807e6a12fdfd8c91f345" UNIQUE ("hash")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "UQ_4c5a170807e6a12fdfd8c91f345"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP COLUMN "hash"`);
    }

}
