import {MigrationInterface, QueryRunner} from "typeorm";

export class createdAudio1598627636284 implements MigrationInterface {
    name = 'createdAudio1598627636284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "audio" character varying NOT NULL DEFAULT 'https://mobcup.net/d/c76xxfvk/mp3'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "audio"`);
    }

}
