import {MigrationInterface, QueryRunner} from "typeorm";

export class addWorkspaceAndUserEntitiesWithRelations1596707134771 implements MigrationInterface {
    name = 'addWorkspaceAndUserEntitiesWithRelations1596707134771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workspace" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(100) NOT NULL, "createdByUserId" uuid NOT NULL, CONSTRAINT "UQ_406f56fc2a42ad5f541973cdbee" UNIQUE ("name"), CONSTRAINT "PK_ca86b6f9b3be5fe26d307d09b49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(100) NOT NULL, "displayName" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "imageUrl" character varying, "title" character varying(300), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_workspaces" ("userId" uuid NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "PK_a26a5a9f414994d2a0c4ed98b53" PRIMARY KEY ("userId", "workspaceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a9367232a3056f4a700819e31" ON "users_workspaces" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1e67451083e224ce47fa27d2d" ON "users_workspaces" ("workspaceId") `);
        await queryRunner.query(`ALTER TABLE "workspace" ADD CONSTRAINT "FK_7045cbcb907692b231140d7444b" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_workspaces" ADD CONSTRAINT "FK_1a9367232a3056f4a700819e316" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_workspaces" ADD CONSTRAINT "FK_a1e67451083e224ce47fa27d2dd" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_workspaces" DROP CONSTRAINT "FK_a1e67451083e224ce47fa27d2dd"`);
        await queryRunner.query(`ALTER TABLE "users_workspaces" DROP CONSTRAINT "FK_1a9367232a3056f4a700819e316"`);
        await queryRunner.query(`ALTER TABLE "workspace" DROP CONSTRAINT "FK_7045cbcb907692b231140d7444b"`);
        await queryRunner.query(`DROP INDEX "IDX_a1e67451083e224ce47fa27d2d"`);
        await queryRunner.query(`DROP INDEX "IDX_1a9367232a3056f4a700819e31"`);
        await queryRunner.query(`DROP TABLE "users_workspaces"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "workspace"`);
    }

}
