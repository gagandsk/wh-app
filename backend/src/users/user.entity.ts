import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRole, UserStatus } from "../types"; 

@Entity('users') 
export class User {

    @PrimaryGeneratedColumn("uuid") 
    id!: string; 

    @Column({ unique: true })
    email!: string;

    @Column()
    name!: string;
    
    @Column({
        type: "varchar", 
        length: 20, 
        default: 'viewer',
    })
    role!: UserRole;

    @Column({
        type: "varchar",
        length: 20,
        default: 'active',
    })
    status!: UserStatus;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}