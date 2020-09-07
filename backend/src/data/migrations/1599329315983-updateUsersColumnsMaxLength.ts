import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUsersColumnsMaxLength1599329315983 implements MigrationInterface {
    name = 'updateUsersColumnsMaxLength1599329315983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "title" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying(103)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "status" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "title" character varying(300)`);
    }

}
