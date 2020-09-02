import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultAudio1599055905168 implements MigrationInterface {
    name = 'defaultAudio1599055905168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "audio" SET DEFAULT 'https://bsa-chatito-storage.s3.amazonaws.com/audios/Tuturu.mp3'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "audio" SET DEFAULT ''`);
    }

}
