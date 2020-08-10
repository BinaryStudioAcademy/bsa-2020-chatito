import {MigrationInterface, QueryRunner} from "typeorm";

export class setImageUrlNullableInWorkspace1596799985951 implements MigrationInterface {
    name = 'setImageUrlNullableInWorkspace1596799985951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" ALTER COLUMN "imageUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workspace" ALTER COLUMN "imageUrl" SET NOT NULL`);
    }

}
