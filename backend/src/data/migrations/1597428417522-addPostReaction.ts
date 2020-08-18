import {MigrationInterface, QueryRunner} from "typeorm";

export class addPostReaction1597428417522 implements MigrationInterface {
    name = 'addPostReaction1597428417522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_reaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reaction" character varying NOT NULL, "postId" uuid, "userId" uuid, CONSTRAINT "PK_72c5fe23f6a0f35b8c2ba78945f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5019c594c963270ac7a6bfafbec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5019c594c963270ac7a6bfafbec"`);
        await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1"`);
        await queryRunner.query(`DROP TABLE "post_reaction"`);
    }

}
