import {MigrationInterface, QueryRunner} from "typeorm";

export class addGitHubIntegrationType1599560466182 implements MigrationInterface {
    name = 'addGitHubIntegrationType1599560466182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."post_integration_enum" RENAME TO "post_integration_enum_old"`);
        await queryRunner.query(`CREATE TYPE "post_integration_enum" AS ENUM('Whale', 'Schedulia', 'GitHub', 'None')`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" TYPE "post_integration_enum" USING "integration"::"text"::"post_integration_enum"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" SET DEFAULT 'None'`);
        await queryRunner.query(`DROP TYPE "post_integration_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "post_integration_enum_old" AS ENUM('Whale', 'Schedulia', 'None')`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" TYPE "post_integration_enum_old" USING "integration"::"text"::"post_integration_enum_old"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "integration" SET DEFAULT 'None'`);
        await queryRunner.query(`DROP TYPE "post_integration_enum"`);
        await queryRunner.query(`ALTER TYPE "post_integration_enum_old" RENAME TO  "post_integration_enum"`);
    }

}
