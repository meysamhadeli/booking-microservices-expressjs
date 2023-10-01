import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValueForSeat1696196212329 implements MigrationInterface {
    name = 'SetDefaultValueForSeat1696196212329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seat" ALTER COLUMN "isReserved" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seat" ALTER COLUMN "isReserved" DROP DEFAULT`);
    }

}
