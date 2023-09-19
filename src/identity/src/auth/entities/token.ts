import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TokenType } from '../enums/tokenType';
import { User } from '../../user/entities/user';

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
  user?: User;

  @Column()
  userId: number;

  constructor(
    token: string,
    expires: Date,
    type: TokenType,
    blacklisted: boolean,
    userId: number,
    createdAt?: Date,
    user?: User
  ) {
    this.token = token;
    this.expires = expires;
    this.type = type;
    this.blacklisted = blacklisted;
    this.userId = userId;
    this.createdAt = createdAt ?? new Date();
    this.user = user;
  }
}
