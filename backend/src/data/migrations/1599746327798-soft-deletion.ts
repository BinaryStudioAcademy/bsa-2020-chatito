import {MigrationInterface, QueryRunner} from "typeorm";

export class softDeletion1599746327798 implements MigrationInterface {
    name = 'softDeletion1599746327798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "post" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "isDeleted"`);
    }

}
