import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultIntegrationType1599237845180 implements MigrationInterface {
    name = 'defaultIntegrationType1599237845180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" SET DEFAULT 'None'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" DROP DEFAULT`);
    }

}
