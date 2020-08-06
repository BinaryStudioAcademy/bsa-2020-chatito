import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserAndRelationsBetweenUsersAndWorkspaces1596636744538 implements MigrationInterface {
    name = 'createUserAndRelationsBetweenUsersAndWorkspaces1596636744538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_workspaces" ("userId" uuid NOT NULL, "workspaceId" uuid NOT NULL, CONSTRAINT "PK_a26a5a9f414994d2a0c4ed98b53" PRIMARY KEY ("userId", "workspaceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a9367232a3056f4a700819e31" ON "users_workspaces" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1e67451083e224ce47fa27d2d" ON "users_workspaces" ("workspaceId") `);
        await queryRunner.query(`ALTER TABLE "users_workspaces" ADD CONSTRAINT "FK_1a9367232a3056f4a700819e316" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_workspaces" ADD CONSTRAINT "FK_a1e67451083e224ce47fa27d2dd" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_workspaces" DROP CONSTRAINT "FK_a1e67451083e224ce47fa27d2dd"`);
        await queryRunner.query(`ALTER TABLE "users_workspaces" DROP CONSTRAINT "FK_1a9367232a3056f4a700819e316"`);
        await queryRunner.query(`DROP INDEX "IDX_a1e67451083e224ce47fa27d2d"`);
        await queryRunner.query(`DROP INDEX "IDX_1a9367232a3056f4a700819e31"`);
        await queryRunner.query(`DROP TABLE "users_workspaces"`);
    }

}
