import httpStatus from 'http-status';
import { userService } from '../services';
import {Body, Controller, Delete, Get, Post, Put, Query, Route, Security, SuccessResponse} from 'tsoa';
import { CreateUserRequestDto } from '../dtos/createUserRequestDto';
import NotFoundError from "../types/notFoundError";
import {User} from "../entities/user";
import {PagedResultResponse} from "../types/response";
import {UpdateUserRequestDto} from "../dtos/updateUserRequestDto";

@Route('/user')
export class UserController extends Controller {
  @Post('v1/create')
  @Security("jwt")
  @SuccessResponse('201', 'CREATED')
  public async createUser(@Body() request: CreateUserRequestDto): Promise<User> {
    const user = await userService.createUser(request);
    this.setStatus(httpStatus.CREATED);
    return user;
  }

  @Get('v1/get')
  @Security("jwt")
  @SuccessResponse('200', 'OK')
  public async getUsers(
    @Query() name?: string,
    @Query() pageSize?: number,
    @Query() page?: number,
  ): Promise<PagedResultResponse<User[]>> {

    return  await userService.queryUsers({page: page, pageSize: pageSize,searchTerm: name})
  }

  @Get('v1/get-by-id')
  @Security("jwt")
  @SuccessResponse('200', 'OK')
  public async getUserById(@Query() id: number): Promise<User> {
    const user = await userService.getUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  @Put('v1/update')
  @Security("jwt")
  @SuccessResponse('204', 'NO_CONTENT')
  public async updateUser(
    @Query() id: number,
    @Body() request: UpdateUserRequestDto
  ): Promise<User> {
    const user = await userService.updateUserById(id, request);
    this.setStatus(httpStatus.NO_CONTENT);
    return user;
  }

  @Delete('v1/delete')
  @Security("jwt")
  @SuccessResponse('204', 'NO_CONTENT')
  public async deleteUserById(@Query() id: number): Promise<User> {
    const user = await userService.deleteUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    this.setStatus(httpStatus.NO_CONTENT);
    return user;
  }
}
