import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableName1599826746597 implements MigrationInterface {
    name = 'NullableName1599826746597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "name" SET NOT NULL`);
    }

}
