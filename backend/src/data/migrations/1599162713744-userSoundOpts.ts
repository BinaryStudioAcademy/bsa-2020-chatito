import {MigrationInterface, QueryRunner} from "typeorm";

export class userSoundOpts1599162713744 implements MigrationInterface {
    name = 'userSoundOpts1599162713744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_incomingsoundoptions_enum" AS ENUM('AllowCustom', 'UseDefault', 'MuteAll')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "incomingSoundOptions" "user_incomingsoundoptions_enum" NOT NULL DEFAULT 'AllowCustom'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "incomingSoundOptions"`);
        await queryRunner.query(`DROP TYPE "user_incomingsoundoptions_enum"`);
    }

}
