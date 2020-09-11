import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConstraint1599826895935 implements MigrationInterface {
    name = 'AddConstraint1599826895935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "UQ_2a03fa2ac3c13e552e9cb6956a2" UNIQUE ("name", "workspaceId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "UQ_2a03fa2ac3c13e552e9cb6956a2"`);
    }

}
