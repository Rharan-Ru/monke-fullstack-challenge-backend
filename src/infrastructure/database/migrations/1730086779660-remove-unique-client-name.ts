import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueClientName1730086779660 implements MigrationInterface {
    name = 'RemoveUniqueClientName1730086779660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_480f88a019346eae487a0cd7f0\` ON \`client\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_480f88a019346eae487a0cd7f0\` ON \`client\` (\`name\`)`);
    }

}
