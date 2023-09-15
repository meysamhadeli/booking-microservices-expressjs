import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Token} from "./token";
import {Role} from "../enums/role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  isEmailVerified: boolean;

  @Column({
    type: 'enum',
    enum: Role, // Use the Role enum for this column
    default: Role.USER, // Set a default role if needed
  })
  role: Role;

  @Column()
  createdAt: Date;

  @Column({ nullable: true }) // Making 'updatedAt' nullable
  updatedAt?: Date | null; // You can use 'Date | null' to allow null values

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
