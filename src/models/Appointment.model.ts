import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointment')
export class Appointment {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   provider: string;

   @Column('timestamp with time zone')
   date: Date;
}
