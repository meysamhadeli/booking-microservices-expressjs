import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSeatTable1696190894872 implements MigrationInterface {
    name = 'CreateSeatTable1696190894872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."seat_seatclass_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TYPE "public"."seat_seattype_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "seatNumber" character varying NOT NULL, "price" integer NOT NULL, "seatClass" "public"."seat_seatclass_enum" NOT NULL DEFAULT '0', "seatType" "public"."seat_seattype_enum" NOT NULL DEFAULT '0', "flightId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_5298809d13db3c04e6bf460e207" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_5298809d13db3c04e6bf460e207"`);
        await queryRunner.query(`DROP TABLE "seat"`);
        await queryRunner.query(`DROP TYPE "public"."seat_seattype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."seat_seatclass_enum"`);
    }

}
