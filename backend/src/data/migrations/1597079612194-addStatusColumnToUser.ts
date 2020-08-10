import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusColumnToUser1597079612194 implements MigrationInterface {
    name = 'addStatusColumnToUser1597079612194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    }

}
