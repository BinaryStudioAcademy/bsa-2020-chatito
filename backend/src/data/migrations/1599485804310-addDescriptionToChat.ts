import {MigrationInterface, QueryRunner} from "typeorm";

export class addDescriptionToChat1599485804310 implements MigrationInterface {
    name = 'addDescriptionToChat1599485804310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD "description" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "description"`);
    }

}
