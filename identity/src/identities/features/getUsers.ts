import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { dataSource } from '../../data/dataSource';
import { User } from '../entities/user';
import { UserDto } from '../dtos/userDto';
import { Controller, Get, Query, Route, Security, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import { SelectQueryBuilder } from 'typeorm';
import mapper from '../mapping';
import { PagedResult } from 'building-blocks/types/pagination/pagedResult';

export class GetUsers implements IRequest<PagedResult<UserDto[]>> {
  page = 1;
  pageSize = 10;
  orderBy = 'id';
  order: 'ASC' | 'DESC' = 'ASC';
  searchTerm?: string = null;

  constructor(request: Partial<GetUsers> = {}) {
    Object.assign(this, request);
  }
}

const getUsersValidations = Joi.object<GetUsers>({
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).default(10),
  orderBy: Joi.string().valid('id', 'name', 'email').default('id'),
  order: Joi.string().valid('ASC', 'DESC').default('ASC'),
  searchTerm: Joi.string().allow(null).optional()
});

@Route('/identity')
export class GetUsersController extends Controller {
  @Get('v1/get')
  @Security('jwt')
  @SuccessResponse('200', 'OK')
  public async getUsers(
    @Query() pageSize = 10,
    @Query() page = 1,
    @Query() order: 'ASC' | 'DESC' = 'ASC',
    @Query() orderBy = 'id',
    @Query() searchTerm?: string
  ): Promise<PagedResult<UserDto[]>> {
    const result = await mediatrJs.send<PagedResult<UserDto[]>>(
      new GetUsers({
        page: page,
        pageSize: pageSize,
        searchTerm: searchTerm,
        order: order,
        orderBy: orderBy
      })
    );

    return result;
  }
}

export class GetUsersHandler implements IHandler<GetUsers, PagedResult<UserDto[]>> {
  async handle(request: GetUsers): Promise<PagedResult<UserDto[]>> {
    await getUsersValidations.validateAsync(request);

    const userRepository = dataSource.getRepository(User);

    const skip = (request.page - 1) * request.pageSize;
    const take = request.pageSize;

    const queryBuilder: SelectQueryBuilder<User> = userRepository
      .createQueryBuilder('user')
      .orderBy(`user.${request.orderBy}`, request.order)
      .skip(skip)
      .take(take);

    // Apply filter criteria to the query
    if (request.searchTerm) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${request.searchTerm}%` });
    }

    const [usersEntity, total] = await queryBuilder.getManyAndCount();

    const result = usersEntity.map((user) => mapper.map<User, UserDto>(user, new UserDto()));

    return new PagedResult<UserDto[]>(result, total);
  }
}

mediatrJs.registerHandler(GetUsers, new GetUsersHandler());
