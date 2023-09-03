import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { userService } from '../services';
import { Body, Controller, Delete, Get, Post, Put, Query, Route, SuccessResponse } from 'tsoa';
import { CreateUserRequestDto } from '../dtos/createUserRequestDto';
import { Role } from '../enums/role';
import { Prisma } from '@prisma/client';

@Route('/user')
export class UserController extends Controller {
  @Post('create')
  @SuccessResponse('201', 'CREATED')
  public async createUser(@Body() request: CreateUserRequestDto): Promise<number> {
    const user = await userService.createUser(
      request.email,
      request.password,
      request.name,
      request.role
    );
    this.setStatus(httpStatus.CREATED);
    return user.id;
  }

  @Get('get')
  @SuccessResponse('200', 'OK')
  public async getUsers(
    @Query() name?: string,
    @Query() role?: Role,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sortBy?: string
  ): Promise<void> {
    // const filter = pick(queryParams, ['name', 'role']);
    // const options = pick(queryParams, ['sortBy', 'limit', 'page']);
    // const result = await userService.queryUsers();
    // return result.map(x=>x.id);
  }

  @Get('get-by-id')
  @SuccessResponse('200', 'OK')
  public async getUserById(@Query() id: number): Promise<number> {
    const user = await userService.getUserById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user.id;
  }

  @Put('update')
  @SuccessResponse('204', 'NO_CONTENT')
  public async updateUser(
    @Query() id: number,
    @Body() request: Prisma.UserUpdateInput
  ): Promise<number | undefined> {
    const user = await userService.updateUserById(id, request);
    this.setStatus(httpStatus.NO_CONTENT);
    return user?.id;
  }

  @Delete('delete')
  @SuccessResponse('204', 'NO_CONTENT')
  public async deleteUserById(@Query() id: number): Promise<number> {
    const user = await userService.deleteUserById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    this.setStatus(httpStatus.NO_CONTENT);
    return user.id;
  }
}
