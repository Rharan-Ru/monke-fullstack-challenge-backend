import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  weight: number;

  @Column({ length: 255 })
  street: string;

  @Column({ length: 255 })
  number: string;

  @Column({ length: 255 })
  neighborhood: string;

  @Column({ length: 255 })
  complement: string;

  @Column({ length: 255 })
  city: string;

  @Column({ length: 255 })
  state: string;

  @Column({ length: 255 })
  country: string;

  @Column({ length: 255 })
  latitude: string;

  @Column({ length: 255 })
  longitude: string;

  @ManyToOne(() => Client, (client) => client.addresses)
  client: Client;
}
