import httpStatus from 'http-status';
import { userService } from '../services';
import {Body, Controller, Delete, Get, Post, Put, Query, Route, Security, SuccessResponse} from 'tsoa';
import { CreateUserRequestDto } from '../dtos/createUserRequestDto';
import { Role } from '../enums/role';
import { Prisma } from '@prisma/client';
import NotFoundError from "../types/notFoundError";

@Route('/user')
export class UserController extends Controller {
  @Post('v1/create')
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

  @Get('v1/get')
  @Security("jwt", ["admin"])
  @SuccessResponse('200', 'OK')
  public async getUsers(
    @Query() name?: string,
    @Query() role?: Role,
    @Query() limit?: number,
    @Query() page?: number,
    @Query() sortBy?: string
  ): Promise<void> {
    console.log('we call get endpoint!')
    // const filter = pick(queryParams, ['name', 'role']);
    // const options = pick(queryParams, ['sortBy', 'limit', 'page']);
    // const result = await userService.queryUsers();
    // return result.map(x=>x.id);
  }

  @Get('v1/get-by-id')
  @Security("jwt")
  @SuccessResponse('200', 'OK')
  public async getUserById(@Query() id: number): Promise<number> {
    const user = await userService.getUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user.id;
  }

  @Put('v1/update')
  @SuccessResponse('204', 'NO_CONTENT')
  public async updateUser(
    @Query() id: number,
    @Body() request: Prisma.UserUpdateInput
  ): Promise<number | undefined> {
    const user = await userService.updateUserById(id, request);
    this.setStatus(httpStatus.NO_CONTENT);
    return user?.id;
  }

  @Delete('v1/delete')
  @SuccessResponse('204', 'NO_CONTENT')
  public async deleteUserById(@Query() id: number): Promise<number> {
    const user = await userService.deleteUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    this.setStatus(httpStatus.NO_CONTENT);
    return user.id;
  }
}
