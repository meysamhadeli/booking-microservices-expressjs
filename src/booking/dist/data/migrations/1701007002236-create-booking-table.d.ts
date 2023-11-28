import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateBookingTable1701007002236 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
