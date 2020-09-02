import {MigrationInterface, QueryRunner} from "typeorm";

export class addChatHash1597401487820 implements MigrationInterface {
    name = 'addChatHash1597401487820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD "hash" character varying(7) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "UQ_49aa74145a400372135c0e7961c" UNIQUE ("hash")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "UQ_49aa74145a400372135c0e7961c"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "hash"`);
    }

}
