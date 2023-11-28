import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateFlightTable1701006616850 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
