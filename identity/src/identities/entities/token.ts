import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TokenType } from '../enums/tokenType';
import { User } from './user';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expires: Date;

  @Column()
  type: TokenType;

  @Column()
  blacklisted: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tokens)
  user: User;

  @Column()
  userId?: number;
}
