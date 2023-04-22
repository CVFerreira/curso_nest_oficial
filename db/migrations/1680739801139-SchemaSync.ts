import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1680739801139 implements MigrationInterface {
  name = "SchemaSync1680739801139";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" DROP "description`,
      undefined
    );
  }
}
