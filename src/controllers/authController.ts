// import httpStatus from 'http-status';
// import {authService, userService, tokenService, emailService} from '../services';
// import exclude from '../utils/exclude';
// import {Body, BodyProp, Controller, Post, Query, Route, SuccessResponse} from "tsoa";
// import {RegisterRequestDto} from "../dtos/registerRequestDto";
// import {LoginRequestDto} from "../dtos/loginRequestDto";
// import {AuthTokensResponse} from "../types/response";
// import {SendVerificationEmailRequestDto} from "../dtos/sendVerificationEmailRequestDto";
//
// @Route('/auth')
// export class AuthController extends Controller {
//   @Post('v1/register')
//   @SuccessResponse('201', 'CREATED')
//   public async register(@Body() request: RegisterRequestDto): Promise<number> {
//     const user = await userService.createUser(
//       request.email,
//       request.password
//     );
//     this.setStatus(httpStatus.CREATED);
//     return user.id;
//   }
//
//   @Post('v1/login')
//   @SuccessResponse('200', 'OK')
//   public async login(@Body() request: LoginRequestDto): Promise<AuthTokensResponse> {
//     const user = await authService.loginUserWithEmailAndPassword(request.email, request.password);
//     const token = await tokenService.generateAuthTokens(user);
//     return token;
//   }
//
//   @Post('v1/logout')
//   @SuccessResponse('204', 'NO_CONTENT')
//   public async logout(@BodyProp() refreshToken: string): Promise<void> {
//     await authService.logout(refreshToken);
//     this.setStatus(httpStatus.NO_CONTENT);
//   }
//
//   @Post('v1/refreshToken')
//   @SuccessResponse('200', 'OK')
//   public async refreshToken(@BodyProp() refreshToken: string): Promise<AuthTokensResponse> {
//     const token = await authService.refreshAuth(refreshToken);
//     return token;
//   }
//
//   @Post('v1/forgotPassword')
//   @SuccessResponse('204', 'NO_CONTENT')
//   public async forgotPassword(@BodyProp() email: string): Promise<void> {
//     const resetPasswordToken = await tokenService.generateResetPasswordToken(email);
//     await emailService.sendResetPasswordEmail(email, resetPasswordToken);
//     this.setStatus(httpStatus.NO_CONTENT);
//   }
//
//   @Post('v1/resetPassword')
//   @SuccessResponse('204', 'NO_CONTENT')
//   public async resetPassword(@Query() token: string, @BodyProp() email: string): Promise<void> {
//     await authService.resetPassword(token, email);
//     this.setStatus(httpStatus.NO_CONTENT);
//   }
//
//   @Post('v1/sendVerificationEmail')
//   @SuccessResponse('204', 'NO_CONTENT')
//   public async sendVerificationEmail(@Body() request: SendVerificationEmailRequestDto): Promise<void> {
//     const verifyEmailToken = await tokenService.generateVerifyEmailToken({id: request.id});
//     await emailService.sendVerificationEmail(request.email, verifyEmailToken);
//     this.setStatus(httpStatus.NO_CONTENT);
//   }
//
//   @Post('v1/verifyEmail')
//   @SuccessResponse('204', 'NO_CONTENT')
//   public async verifyEmail(@Query() token: string): Promise<void> {
//     await authService.verifyEmail(token);
//     this.setStatus(httpStatus.NO_CONTENT);
//   }
// }
