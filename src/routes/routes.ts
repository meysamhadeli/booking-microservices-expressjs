/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/authController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/userController';
import { expressAuthentication } from './../../authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "RegisterRequestDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenResponse": {
        "dataType": "refObject",
        "properties": {
            "token": {"dataType":"string","required":true},
            "expires": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthTokensResponse": {
        "dataType": "refObject",
        "properties": {
            "access": {"ref":"TokenResponse","required":true},
            "refresh": {"ref":"TokenResponse"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginRequestDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendVerificationEmailRequestDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Role": {
        "dataType": "refEnum",
        "enums": ["USER","ADMIN"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserRequestDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "role": {"ref":"Role","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StringFieldUpdateOperationsInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NullableStringFieldUpdateOperationsInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EnumRoleFieldUpdateOperationsInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"ref":"Role"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BoolFieldUpdateOperationsInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DateTimeFieldUpdateOperationsInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Without_any.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ACCESS"]},{"dataType":"enum","enums":["REFRESH"]},{"dataType":"enum","enums":["RESET_PASSWORD"]},{"dataType":"enum","enums":["VERIFY_EMAIL"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUncheckedCreateWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"boolean","required":true},"expires":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}],"required":true},"type":{"ref":"TokenType","required":true},"token":{"dataType":"string","required":true},"id":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenCreateWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"boolean","required":true},"expires":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}],"required":true},"type":{"ref":"TokenType","required":true},"token":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_Enumerable_TokenCreateWithoutUserInput_.Enumerable_TokenUncheckedCreateWithoutUserInput__": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenUncheckedCreateWithoutUserInput"}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenCreateWithoutUserInput"}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenUncheckedCreateWithoutUserInput"}}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenCreateWithoutUserInput"}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenUncheckedCreateWithoutUserInput"}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenCreateWithoutUserInput"}}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenUncheckedCreateWithoutUserInput"}}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenCreateWithoutUserInput"}}]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenWhereUniqueInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_TokenCreateWithoutUserInput.TokenUncheckedCreateWithoutUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenUncheckedCreateWithoutUserInput"}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenCreateWithoutUserInput"}]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenCreateOrConnectWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"create":{"ref":"XOR_TokenCreateWithoutUserInput.TokenUncheckedCreateWithoutUserInput_","required":true},"where":{"ref":"TokenWhereUniqueInput","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenCreateOrConnectWithoutUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenCreateOrConnectWithoutUserInput"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenCreateOrConnectWithoutUserInput"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IntFieldUpdateOperationsInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"divide":{"dataType":"double"},"multiply":{"dataType":"double"},"decrement":{"dataType":"double"},"increment":{"dataType":"double"},"set":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EnumTokenTypeFieldUpdateOperationsInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"set":{"ref":"TokenType"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUncheckedUpdateWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"union","subSchemas":[{"ref":"BoolFieldUpdateOperationsInput"},{"dataType":"boolean"}]},"expires":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"type":{"dataType":"union","subSchemas":[{"ref":"EnumTokenTypeFieldUpdateOperationsInput"},{"ref":"TokenType"}]},"token":{"dataType":"union","subSchemas":[{"ref":"StringFieldUpdateOperationsInput"},{"dataType":"string"}]},"id":{"dataType":"union","subSchemas":[{"ref":"IntFieldUpdateOperationsInput"},{"dataType":"double"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUpdateWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"union","subSchemas":[{"ref":"BoolFieldUpdateOperationsInput"},{"dataType":"boolean"}]},"expires":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"type":{"dataType":"union","subSchemas":[{"ref":"EnumTokenTypeFieldUpdateOperationsInput"},{"ref":"TokenType"}]},"token":{"dataType":"union","subSchemas":[{"ref":"StringFieldUpdateOperationsInput"},{"dataType":"string"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_TokenUpdateWithoutUserInput.TokenUncheckedUpdateWithoutUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenUncheckedUpdateWithoutUserInput"}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenUpdateWithoutUserInput"}]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUpsertWithWhereUniqueWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"create":{"ref":"XOR_TokenCreateWithoutUserInput.TokenUncheckedCreateWithoutUserInput_","required":true},"update":{"ref":"XOR_TokenUpdateWithoutUserInput.TokenUncheckedUpdateWithoutUserInput_","required":true},"where":{"ref":"TokenWhereUniqueInput","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenUpsertWithWhereUniqueWithoutUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenUpsertWithWhereUniqueWithoutUserInput"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenUpsertWithWhereUniqueWithoutUserInput"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenCreateManyUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"boolean","required":true},"expires":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}],"required":true},"type":{"ref":"TokenType","required":true},"token":{"dataType":"string","required":true},"id":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenCreateManyUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenCreateManyUserInput"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenCreateManyUserInput"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenCreateManyUserInputEnvelope": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"skipDuplicates":{"dataType":"boolean"},"data":{"ref":"Enumerable_TokenCreateManyUserInput_","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenWhereUniqueInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenWhereUniqueInput"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenWhereUniqueInput"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUpdateWithWhereUniqueWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"ref":"XOR_TokenUpdateWithoutUserInput.TokenUncheckedUpdateWithoutUserInput_","required":true},"where":{"ref":"TokenWhereUniqueInput","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenUpdateWithWhereUniqueWithoutUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenUpdateWithWhereUniqueWithoutUserInput"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenUpdateWithWhereUniqueWithoutUserInput"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenScalarWhereInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"userId":{"dataType":"union","subSchemas":[{"ref":"IntFilter"},{"dataType":"double"}]},"createdAt":{"dataType":"union","subSchemas":[{"ref":"DateTimeFilter"},{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"union","subSchemas":[{"ref":"BoolFilter"},{"dataType":"boolean"}]},"expires":{"dataType":"union","subSchemas":[{"ref":"DateTimeFilter"},{"dataType":"datetime"},{"dataType":"string"}]},"type":{"dataType":"union","subSchemas":[{"ref":"EnumTokenTypeFilter"},{"ref":"TokenType"}]},"token":{"dataType":"union","subSchemas":[{"ref":"StringFilter"},{"dataType":"string"}]},"id":{"dataType":"union","subSchemas":[{"ref":"IntFilter"},{"dataType":"double"}]},"NOT":{"ref":"Enumerable_TokenScalarWhereInput_"},"OR":{"ref":"Enumerable_TokenScalarWhereInput_"},"AND":{"ref":"Enumerable_TokenScalarWhereInput_"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenScalarWhereInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenScalarWhereInput"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenScalarWhereInput"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_number_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"array","array":{"dataType":"double"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NestedIntFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedIntFilter"},{"dataType":"double"}]},"gte":{"dataType":"double"},"gt":{"dataType":"double"},"lte":{"dataType":"double"},"lt":{"dataType":"double"},"notIn":{"dataType":"union","subSchemas":[{"ref":"Enumerable_number_"},{"dataType":"double"}]},"in":{"dataType":"union","subSchemas":[{"ref":"Enumerable_number_"},{"dataType":"double"}]},"equals":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IntFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedIntFilter"},{"dataType":"double"}]},"gte":{"dataType":"double"},"gt":{"dataType":"double"},"lte":{"dataType":"double"},"lt":{"dataType":"double"},"notIn":{"dataType":"union","subSchemas":[{"ref":"Enumerable_number_"},{"dataType":"double"}]},"in":{"dataType":"union","subSchemas":[{"ref":"Enumerable_number_"},{"dataType":"double"}]},"equals":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_string_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"array","array":{"dataType":"string"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QueryMode": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["default"]},{"dataType":"enum","enums":["insensitive"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NestedStringFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedStringFilter"},{"dataType":"string"}]},"endsWith":{"dataType":"string"},"startsWith":{"dataType":"string"},"contains":{"dataType":"string"},"gte":{"dataType":"string"},"gt":{"dataType":"string"},"lte":{"dataType":"string"},"lt":{"dataType":"string"},"notIn":{"dataType":"union","subSchemas":[{"ref":"Enumerable_string_"},{"dataType":"string"}]},"in":{"dataType":"union","subSchemas":[{"ref":"Enumerable_string_"},{"dataType":"string"}]},"equals":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StringFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedStringFilter"},{"dataType":"string"}]},"mode":{"ref":"QueryMode"},"endsWith":{"dataType":"string"},"startsWith":{"dataType":"string"},"contains":{"dataType":"string"},"gte":{"dataType":"string"},"gt":{"dataType":"string"},"lte":{"dataType":"string"},"lt":{"dataType":"string"},"notIn":{"dataType":"union","subSchemas":[{"ref":"Enumerable_string_"},{"dataType":"string"}]},"in":{"dataType":"union","subSchemas":[{"ref":"Enumerable_string_"},{"dataType":"string"}]},"equals":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenType_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenType"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenType"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NestedEnumTokenTypeFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedEnumTokenTypeFilter"},{"ref":"TokenType"}]},"notIn":{"ref":"Enumerable_TokenType_"},"in":{"ref":"Enumerable_TokenType_"},"equals":{"ref":"TokenType"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EnumTokenTypeFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedEnumTokenTypeFilter"},{"ref":"TokenType"}]},"notIn":{"ref":"Enumerable_TokenType_"},"in":{"ref":"Enumerable_TokenType_"},"equals":{"ref":"TokenType"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_Date_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"array","array":{"dataType":"datetime"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NestedDateTimeFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedDateTimeFilter"},{"dataType":"datetime"},{"dataType":"string"}]},"gte":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"gt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"lte":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"lt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"notIn":{"dataType":"union","subSchemas":[{"ref":"Enumerable_Date_"},{"ref":"Enumerable_string_"},{"dataType":"datetime"},{"dataType":"string"}]},"in":{"dataType":"union","subSchemas":[{"ref":"Enumerable_Date_"},{"ref":"Enumerable_string_"},{"dataType":"datetime"},{"dataType":"string"}]},"equals":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DateTimeFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedDateTimeFilter"},{"dataType":"datetime"},{"dataType":"string"}]},"gte":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"gt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"lte":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"lt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"notIn":{"dataType":"union","subSchemas":[{"ref":"Enumerable_Date_"},{"ref":"Enumerable_string_"},{"dataType":"datetime"},{"dataType":"string"}]},"in":{"dataType":"union","subSchemas":[{"ref":"Enumerable_Date_"},{"ref":"Enumerable_string_"},{"dataType":"datetime"},{"dataType":"string"}]},"equals":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NestedBoolFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedBoolFilter"},{"dataType":"boolean"}]},"equals":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BoolFilter": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"not":{"dataType":"union","subSchemas":[{"ref":"NestedBoolFilter"},{"dataType":"boolean"}]},"equals":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUncheckedUpdateManyWithoutTokenInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"union","subSchemas":[{"ref":"BoolFieldUpdateOperationsInput"},{"dataType":"boolean"}]},"expires":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"type":{"dataType":"union","subSchemas":[{"ref":"EnumTokenTypeFieldUpdateOperationsInput"},{"ref":"TokenType"}]},"token":{"dataType":"union","subSchemas":[{"ref":"StringFieldUpdateOperationsInput"},{"dataType":"string"}]},"id":{"dataType":"union","subSchemas":[{"ref":"IntFieldUpdateOperationsInput"},{"dataType":"double"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUpdateManyMutationInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"blacklisted":{"dataType":"union","subSchemas":[{"ref":"BoolFieldUpdateOperationsInput"},{"dataType":"boolean"}]},"expires":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"type":{"dataType":"union","subSchemas":[{"ref":"EnumTokenTypeFieldUpdateOperationsInput"},{"ref":"TokenType"}]},"token":{"dataType":"union","subSchemas":[{"ref":"StringFieldUpdateOperationsInput"},{"dataType":"string"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "XOR_TokenUpdateManyMutationInput.TokenUncheckedUpdateManyWithoutTokenInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenUncheckedUpdateManyWithoutTokenInput"}]},{"dataType":"intersection","subSchemas":[{"ref":"Without_any.any_"},{"ref":"TokenUpdateManyMutationInput"}]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUpdateManyWithWhereWithoutUserInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"ref":"XOR_TokenUpdateManyMutationInput.TokenUncheckedUpdateManyWithoutTokenInput_","required":true},"where":{"ref":"TokenScalarWhereInput","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Enumerable_TokenUpdateManyWithWhereWithoutUserInput_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TokenUpdateManyWithWhereWithoutUserInput"},{"dataType":"array","array":{"dataType":"refAlias","ref":"TokenUpdateManyWithWhereWithoutUserInput"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenUpdateManyWithoutUserNestedInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"deleteMany":{"ref":"Enumerable_TokenScalarWhereInput_"},"updateMany":{"ref":"Enumerable_TokenUpdateManyWithWhereWithoutUserInput_"},"update":{"ref":"Enumerable_TokenUpdateWithWhereUniqueWithoutUserInput_"},"connect":{"ref":"Enumerable_TokenWhereUniqueInput_"},"delete":{"ref":"Enumerable_TokenWhereUniqueInput_"},"disconnect":{"ref":"Enumerable_TokenWhereUniqueInput_"},"set":{"ref":"Enumerable_TokenWhereUniqueInput_"},"createMany":{"ref":"TokenCreateManyUserInputEnvelope"},"upsert":{"ref":"Enumerable_TokenUpsertWithWhereUniqueWithoutUserInput_"},"connectOrCreate":{"ref":"Enumerable_TokenCreateOrConnectWithoutUserInput_"},"create":{"ref":"XOR_Enumerable_TokenCreateWithoutUserInput_.Enumerable_TokenUncheckedCreateWithoutUserInput__"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Prisma.UserUpdateInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"Token":{"ref":"TokenUpdateManyWithoutUserNestedInput"},"updatedAt":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"createdAt":{"dataType":"union","subSchemas":[{"ref":"DateTimeFieldUpdateOperationsInput"},{"dataType":"datetime"},{"dataType":"string"}]},"isEmailVerified":{"dataType":"union","subSchemas":[{"ref":"BoolFieldUpdateOperationsInput"},{"dataType":"boolean"}]},"role":{"dataType":"union","subSchemas":[{"ref":"EnumRoleFieldUpdateOperationsInput"},{"ref":"Role"}]},"password":{"dataType":"union","subSchemas":[{"ref":"StringFieldUpdateOperationsInput"},{"dataType":"string"}]},"name":{"dataType":"union","subSchemas":[{"ref":"NullableStringFieldUpdateOperationsInput"},{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"email":{"dataType":"union","subSchemas":[{"ref":"StringFieldUpdateOperationsInput"},{"dataType":"string"}]}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/auth/v1/register',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.register)),

            function AuthController_register(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"RegisterRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.register.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/v1/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            function AuthController_login(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"LoginRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/v1/logout',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.logout)),

            function AuthController_logout(request: any, response: any, next: any) {
            const args = {
                    refreshToken: {"in":"body-prop","name":"refreshToken","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.logout.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/v1/refreshToken',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.refreshToken)),

            function AuthController_refreshToken(request: any, response: any, next: any) {
            const args = {
                    refreshToken: {"in":"body-prop","name":"refreshToken","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.refreshToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/v1/forgotPassword',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.forgotPassword)),

            function AuthController_forgotPassword(request: any, response: any, next: any) {
            const args = {
                    email: {"in":"body-prop","name":"email","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.forgotPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/v1/resetPassword',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.resetPassword)),

            function AuthController_resetPassword(request: any, response: any, next: any) {
            const args = {
                    token: {"in":"query","name":"token","required":true,"dataType":"string"},
                    email: {"in":"body-prop","name":"email","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.resetPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/v1/sendVerificationEmail',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.sendVerificationEmail)),

            function AuthController_sendVerificationEmail(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"SendVerificationEmailRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.sendVerificationEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/auth/v1/verifyEmail',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.verifyEmail)),

            function AuthController_verifyEmail(request: any, response: any, next: any) {
            const args = {
                    token: {"in":"query","name":"token","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.verifyEmail.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/user/v1/create',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUser)),

            function UserController_createUser(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"CreateUserRequestDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.createUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user/v1/get',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers)),

            function UserController_getUsers(request: any, response: any, next: any) {
            const args = {
                    name: {"in":"query","name":"name","dataType":"string"},
                    role: {"in":"query","name":"role","ref":"Role"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    page: {"in":"query","name":"page","dataType":"double"},
                    sortBy: {"in":"query","name":"sortBy","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getUsers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/user/v1/get-by-id',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserById)),

            function UserController_getUserById(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"query","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.getUserById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/user/v1/update',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            function UserController_updateUser(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"query","name":"id","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"Prisma.UserUpdateInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.updateUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/user/v1/delete',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUserById)),

            function UserController_deleteUserById(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"query","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UserController();


              const promise = controller.deleteUserById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 204, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny.call(Promise, secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
