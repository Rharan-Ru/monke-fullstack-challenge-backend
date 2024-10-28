import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWeigth1730080166036 implements MigrationInterface {
    name = 'AddWeigth1730080166036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`weight\` decimal(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`weight\``);
    }

}
