import {MigrationInterface, QueryRunner} from "typeorm";

export class updateIntegrationEnum1599222445046 implements MigrationInterface {
    name = 'updateIntegrationEnum1599222445046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."post_integration_enum" RENAME TO "post_integration_enum_old"`);
        await queryRunner.query(`CREATE TYPE "post_integration_enum" AS ENUM('Whale', 'Schedulia', 'None')`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" TYPE "post_integration_enum" USING "integration"::"text"::"post_integration_enum"`);
        await queryRunner.query(`DROP TYPE "post_integration_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "post_integration_enum_old" AS ENUM('Whale', 'None')`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" TYPE "post_integration_enum_old" USING "integration"::"text"::"post_integration_enum_old"`);
        await queryRunner.query(`DROP TYPE "post_integration_enum"`);
        await queryRunner.query(`ALTER TYPE "post_integration_enum_old" RENAME TO  "post_integration_enum"`);
    }

}
