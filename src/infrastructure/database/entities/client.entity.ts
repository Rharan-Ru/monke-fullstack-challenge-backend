import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { User } from './user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => Address, (address) => address.client, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  addresses: Address[];

  @ManyToOne(() => User, (user) => user.clients)
  user: User;
}
