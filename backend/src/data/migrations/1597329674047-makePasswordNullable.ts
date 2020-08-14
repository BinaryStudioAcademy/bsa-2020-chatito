import {MigrationInterface, QueryRunner} from "typeorm";

export class makePasswordNullable1597329674047 implements MigrationInterface {
    name = 'makePasswordNullable1597329674047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
