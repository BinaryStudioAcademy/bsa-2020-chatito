import {MigrationInterface, QueryRunner} from "typeorm";

export class ChatName1599826034706 implements MigrationInterface {
    name = 'ChatName1599826034706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "post" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "UQ_2a03fa2ac3c13e552e9cb6956a2"`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "UQ_2a03fa2ac3c13e552e9cb6956a2" UNIQUE ("name", "workspaceId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "UQ_2a03fa2ac3c13e552e9cb6956a2"`);
        await queryRunner.query(`ALTER TABLE "chat" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "UQ_2a03fa2ac3c13e552e9cb6956a2" UNIQUE ("name", "workspaceId")`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "isDeleted"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "isDeleted"`);
    }

}
