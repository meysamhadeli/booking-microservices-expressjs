import 'reflect-metadata';
import { dataSource } from '../../../../src/data/dataSource';
import { User } from '../../../../src/user/entities/user';

describe('Integration Test', () => {
  it('should create user and retrieve a user from the database', async () => {
    const s = dataSource.getRepository(User);

    const usersEntity = await s.findOneBy({ id: 1 });

    console.log('hiii');
  });
});
