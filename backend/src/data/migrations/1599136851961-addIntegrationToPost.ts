import {MigrationInterface, QueryRunner} from "typeorm";

export class addIntegrationToPost1599136851961 implements MigrationInterface {
    name = 'addIntegrationToPost1599136851961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "post_integration_enum" AS ENUM('Whale', 'None')`);
        await queryRunner.query(`ALTER TABLE "post" ADD "integration" "post_integration_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "integration"`);
        await queryRunner.query(`DROP TYPE "post_integration_enum"`);
    }

}
