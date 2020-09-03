import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultUserAudio1599138484503 implements MigrationInterface {
    name = 'defaultUserAudio1599138484503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "audio" SET DEFAULT 'https://bsa-chatito-storage.s3.amazonaws.com/audios/Tuturu.mp3'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "audio" SET DEFAULT 'https://mobcup.net/d/c76xxfvk/mp3'`);
    }

}
