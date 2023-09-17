# TypeDI Service container integration with TypeORM

![Build Status](https://github.com/typeorm/typeorm-typedi-extensions/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/typeorm-typedi-extensions.svg)](https://badge.fury.io/js/typeorm-typedi-extensions)
[![Dependency Status](https://david-dm.org/typeorm/typeorm-typedi-extensions.svg)](https://david-dm.org/typeorm/typeorm-typedi-extensions)

This package provides decorators for TypeORM that can be used with [TypeDI](https://github.com/pleerock/typedi).

## Installation

To start using TypeDI install the required packages via NPM:

```bash
npm install typeorm-typedi-extensions typedi reflect-metadata
```

Import the `reflect-metadata` package at the **first line** of your application:

```ts
import 'reflect-metadata';

// Your other imports and initialization code
// comes here after you imported the reflect-metadata package!
```

You need to enable emitting decorator metadata in your Typescript config. Add these two lines to your `tsconfig.json` file under the `compilerOptions` key:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

Configure TypeORM in your app to use the TypeDI container before you create a connection:

```ts
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
//       ▲ Notice how we import container from this library, instead of TypeDI.

/** Tell TypeORM to use the container provided by this lib to resolve it's dependencies. */
useContainer(Container);

/** Create a connection and start using TypeORM. */
createConnection({
  /* <connection options> */
}).catch(error => {
  console.error(`Couldn't connect to the database!`);
  console.error(error);
});
```

## Usage

This package exposes three decorators all three decorators can be used on properties or on constructor parameters.

> **IMPORTANT:**
> To allow TypeDI to resolve the dependencies on your classes you must mark them with `@Service` decorator from the TypeDI package.

### `@InjectConnection` decorator

Injects `Connection` from where you can access anything in your connection.
Optionally, you can specify a connection to inject by name in the decorator parameter.

```typescript
import { Service } from 'typedi';
import { Connection } from 'typeorm';
import { InjectConnection } from 'typeorm-typedi-extensions';

@Service()
export class MyCustomClass {
  @InjectConnection()
  private propertyInjectedConnection: Connection;

  constructor(@InjectConnection() private constructorInjectedConnection: Connection) {}
}
```

### `@InjectManager` decorator

Injects `EntityManager` from where you can access any entity in your connection.
Optionally, you can specify a connection to inject by name in the decorator parameter.

```ts
import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';

@Service()
export class MyCustomClass {
  @InjectManager()
  private propertyInjectedEntityManager: EntityManager;

  constructor(@InjectManager() private constructorInjectedEntityManager: EntityManager) {}
}
```

### `@InjectRepository` decorator

Injects `Repository`, `MongoRepository`, `TreeRepository` or custom repository of some Entity.
Optionally, you can specify a connection to inject by name in the decorator parameter.

```typescript
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
// MyDatabaseModel is a TypeORM entity (class marked with `@Entity()` decorator)
import { MyDatabaseModel } from './entities/post.entity.ts';

@Service()
export class MyCustomClass {
  @InjectRepository(MyDatabaseModel)
  private propertyInjectedRepository: Repository<MyDatabaseModel>;

  constructor(@InjectRepository(MyDatabaseModel) private constructorInjectedRepository: Repository<MyDatabaseModel>) {}
}
```

Example with custom connection name:

```ts
@Service()
export class PostRepository {
  @InjectRepository(Post, 'custom-con-name')
  private repository: Repository<Post>;
}
```

You can also inject custom `Repository` of some Entity. To make this work have to create the class which extends the
generic `Repository<T>` class and decorate it with `EntityRepository<T>` decorator.

```typescript
import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
// UserModel is a TypeORM entity (class marked with `@Entity()` decorator)
import { UserModel } from './entities/user.entity.ts';

@Service()
@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {
  public findByEmail(email: string) {
    return this.findOne({ email });
  }
}

@Service()
export class PostService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}

  public async userExist(user: User): boolean {
    return (await this.userRepository.findByEmail(user.email)) ? true : false;
  }
}
```

[typedi]: https://github.com/typestack/typedi
