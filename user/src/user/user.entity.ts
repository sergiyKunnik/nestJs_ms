import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group: number;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  password: string;

}
