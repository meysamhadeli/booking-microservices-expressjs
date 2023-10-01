import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSeatTable1696195472621 implements MigrationInterface {
    name = 'UpdateSeatTable1696195472621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seat" RENAME COLUMN "price" TO "isReserved"`);
        await queryRunner.query(`ALTER TABLE "seat" DROP COLUMN "isReserved"`);
        await queryRunner.query(`ALTER TABLE "seat" ADD "isReserved" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seat" DROP COLUMN "isReserved"`);
        await queryRunner.query(`ALTER TABLE "seat" ADD "isReserved" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "seat" RENAME COLUMN "isReserved" TO "price"`);
    }

}
