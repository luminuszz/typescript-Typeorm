import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
} from 'typeorm';

@Entity('appointment')
export class Appointment {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   provider_id: string;

   @Column('timestamp with time zone')
   date: Date;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
}
