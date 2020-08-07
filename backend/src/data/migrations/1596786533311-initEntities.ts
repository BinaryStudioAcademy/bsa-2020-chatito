import {MigrationInterface, QueryRunner} from "typeorm";

export class initEntities1596786533311 implements MigrationInterface {
    name = 'initEntities1596786533311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, "imageUrl" character varying NOT NULL, "createdByUserId" uuid, CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "createdByUserId" uuid, "posId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "expiresAt" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(100) NOT NULL, "displayName" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "imageUrl" character varying, "title" character varying(300), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "createdByUserId" uuid, "chatId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "chat_type_enum" AS ENUM('Channel', 'DirectMessage')`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(150) NOT NULL, "type" "chat_type_enum" NOT NULL, "isPrivate" boolean NOT NULL, "createdByUserId" uuid, "workspaceId" uuid, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_workspaces_workspace" ("userId" uuid NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "PK_a25759bde9cc94e49a72a04316a" PRIMARY KEY ("userId", "workspaceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2bca1ee291822fa1a508d06237" ON "user_workspaces_workspace" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6eb5f27dd1f2b98ad5855180c1" ON "user_workspaces_workspace" ("workspaceId") `);
        await queryRunner.query(`CREATE TABLE "user_chats_chat" ("userId" uuid NOT NULL, "chatId" uuid NOT NULL, CONSTRAINT "PK_73a8d5df1ca4814192e41235296" PRIMARY KEY ("userId", "chatId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5ddfeacb967a4e33d639ee49" ON "user_chats_chat" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e190c52d44e72db13647dfb745" ON "user_chats_chat" ("chatId") `);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_7045cbcb907692b231140d7444b" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c05bb6dfa077f32115b9d5265bb" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_23ebc7e19f2541faa3974b4b4fc" FOREIGN KEY ("posId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_ec4ec378a6d3a3007db2eddb398" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_3512a8a50050cd0041683a01528" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_076310128b7a66e7591db1822a1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_c14457d74f1e687c7389ed3bba0" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" ADD CONSTRAINT "FK_2bca1ee291822fa1a508d06237d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" ADD CONSTRAINT "FK_6eb5f27dd1f2b98ad5855180c1d" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_chats_chat" ADD CONSTRAINT "FK_cd5ddfeacb967a4e33d639ee499" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_chats_chat" ADD CONSTRAINT "FK_e190c52d44e72db13647dfb745b" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_chats_chat" DROP CONSTRAINT "FK_e190c52d44e72db13647dfb745b"`);
        await queryRunner.query(`ALTER TABLE "user_chats_chat" DROP CONSTRAINT "FK_cd5ddfeacb967a4e33d639ee499"`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" DROP CONSTRAINT "FK_6eb5f27dd1f2b98ad5855180c1d"`);
        await queryRunner.query(`ALTER TABLE "user_workspaces_workspace" DROP CONSTRAINT "FK_2bca1ee291822fa1a508d06237d"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_c14457d74f1e687c7389ed3bba0"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_076310128b7a66e7591db1822a1"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_3512a8a50050cd0041683a01528"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_ec4ec378a6d3a3007db2eddb398"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_23ebc7e19f2541faa3974b4b4fc"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c05bb6dfa077f32115b9d5265bb"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_7045cbcb907692b231140d7444b"`);
        await queryRunner.query(`DROP INDEX "IDX_e190c52d44e72db13647dfb745"`);
        await queryRunner.query(`DROP INDEX "IDX_cd5ddfeacb967a4e33d639ee49"`);
        await queryRunner.query(`DROP TABLE "user_chats_chat"`);
        await queryRunner.query(`DROP INDEX "IDX_6eb5f27dd1f2b98ad5855180c1"`);
        await queryRunner.query(`DROP INDEX "IDX_2bca1ee291822fa1a508d06237"`);
        await queryRunner.query(`DROP TABLE "user_workspaces_workspace"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TYPE "chat_type_enum"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
    }

}
