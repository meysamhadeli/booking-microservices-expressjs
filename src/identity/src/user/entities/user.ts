import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Token } from '../../auth/entities/token';
import { Role } from '../enums/role';

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
    default: Role.USER // Set a default role if needed
  })
  role: Role;

  @Column()
  passportNumber: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true }) // Making 'updatedAt' nullable
  updatedAt?: Date | null; // You can use 'Date | null' to allow null values

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  constructor(
    email: string,
    name: string,
    password: string,
    isEmailVerified: boolean,
    role: Role,
    passportNumber: string,
    createdAt?: Date,
    tokens?: Token[],
    updatedAt?: Date
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.isEmailVerified = isEmailVerified;
    this.role = role;
    this.passportNumber = passportNumber;
    this.createdAt = createdAt ?? new Date();
    this.tokens = tokens;
    this.updatedAt = updatedAt;
  }
}
