import {MigrationInterface, QueryRunner} from "typeorm";

export class postEditDeleteBehaviour1599651672865 implements MigrationInterface {
    name = 'postEditDeleteBehaviour1599651672865'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
      await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_df88c69827aba0264e95f50af90"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "UQ_b25f34dcce73e1e5bdc62203789"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "UQ_7bcb8d80388fc648f7d4dde05f5" UNIQUE ("createdByUserId")`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "UQ_7bcb8d80388fc648f7d4dde05f5"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "UQ_b25f34dcce73e1e5bdc62203789" UNIQUE ("createdByUserId", "postId")`);
      await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_df88c69827aba0264e95f50af90" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_df88c69827aba0264e95f50af90"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5"`);
      await queryRunner.query(`ALTER TABLE "post_reaction" DROP CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1"`);
      await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "UQ_b25f34dcce73e1e5bdc62203789"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "UQ_7bcb8d80388fc648f7d4dde05f5" UNIQUE ("createdByUserId")`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" DROP CONSTRAINT "UQ_7bcb8d80388fc648f7d4dde05f5"`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_7bcb8d80388fc648f7d4dde05f5" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "UQ_b25f34dcce73e1e5bdc62203789" UNIQUE ("createdByUserId", "postId")`);
      await queryRunner.query(`ALTER TABLE "draft_comment" ADD CONSTRAINT "FK_df88c69827aba0264e95f50af90" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "post_reaction" ADD CONSTRAINT "FK_5e7b98f3cea583c73a0bbbe0de1" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

}
