
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Queue
 * 
 */
export type Queue = $Result.DefaultSelection<Prisma.$QueuePayload>
/**
 * Model Window
 * 
 */
export type Window = $Result.DefaultSelection<Prisma.$WindowPayload>
/**
 * Model UserWindow
 * 
 */
export type UserWindow = $Result.DefaultSelection<Prisma.$UserWindowPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queue`: Exposes CRUD operations for the **Queue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Queues
    * const queues = await prisma.queue.findMany()
    * ```
    */
  get queue(): Prisma.QueueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.window`: Exposes CRUD operations for the **Window** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Windows
    * const windows = await prisma.window.findMany()
    * ```
    */
  get window(): Prisma.WindowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userWindow`: Exposes CRUD operations for the **UserWindow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserWindows
    * const userWindows = await prisma.userWindow.findMany()
    * ```
    */
  get userWindow(): Prisma.UserWindowDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends bigint
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Queue: 'Queue',
    Window: 'Window',
    UserWindow: 'UserWindow'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "queue" | "window" | "userWindow"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Queue: {
        payload: Prisma.$QueuePayload<ExtArgs>
        fields: Prisma.QueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          findFirst: {
            args: Prisma.QueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          findMany: {
            args: Prisma.QueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>[]
          }
          create: {
            args: Prisma.QueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          createMany: {
            args: Prisma.QueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>[]
          }
          delete: {
            args: Prisma.QueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          update: {
            args: Prisma.QueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          deleteMany: {
            args: Prisma.QueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          aggregate: {
            args: Prisma.QueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueue>
          }
          groupBy: {
            args: Prisma.QueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueCountArgs<ExtArgs>
            result: $Utils.Optional<QueueCountAggregateOutputType> | number
          }
        }
      }
      Window: {
        payload: Prisma.$WindowPayload<ExtArgs>
        fields: Prisma.WindowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WindowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WindowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>
          }
          findFirst: {
            args: Prisma.WindowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WindowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>
          }
          findMany: {
            args: Prisma.WindowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>[]
          }
          create: {
            args: Prisma.WindowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>
          }
          createMany: {
            args: Prisma.WindowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WindowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>[]
          }
          delete: {
            args: Prisma.WindowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>
          }
          update: {
            args: Prisma.WindowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>
          }
          deleteMany: {
            args: Prisma.WindowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WindowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WindowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WindowPayload>
          }
          aggregate: {
            args: Prisma.WindowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWindow>
          }
          groupBy: {
            args: Prisma.WindowGroupByArgs<ExtArgs>
            result: $Utils.Optional<WindowGroupByOutputType>[]
          }
          count: {
            args: Prisma.WindowCountArgs<ExtArgs>
            result: $Utils.Optional<WindowCountAggregateOutputType> | number
          }
        }
      }
      UserWindow: {
        payload: Prisma.$UserWindowPayload<ExtArgs>
        fields: Prisma.UserWindowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserWindowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserWindowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>
          }
          findFirst: {
            args: Prisma.UserWindowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserWindowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>
          }
          findMany: {
            args: Prisma.UserWindowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>[]
          }
          create: {
            args: Prisma.UserWindowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>
          }
          createMany: {
            args: Prisma.UserWindowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserWindowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>[]
          }
          delete: {
            args: Prisma.UserWindowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>
          }
          update: {
            args: Prisma.UserWindowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>
          }
          deleteMany: {
            args: Prisma.UserWindowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserWindowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserWindowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserWindowPayload>
          }
          aggregate: {
            args: Prisma.UserWindowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserWindow>
          }
          groupBy: {
            args: Prisma.UserWindowGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserWindowGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserWindowCountArgs<ExtArgs>
            result: $Utils.Optional<UserWindowCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    queue?: QueueOmit
    window?: WindowOmit
    userWindow?: UserWindowOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    userWindows: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userWindows?: boolean | UserCountOutputTypeCountUserWindowsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserWindowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWindowWhereInput
  }


  /**
   * Count Type WindowCountOutputType
   */

  export type WindowCountOutputType = {
    queues: number
    userWindows: number
  }

  export type WindowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queues?: boolean | WindowCountOutputTypeCountQueuesArgs
    userWindows?: boolean | WindowCountOutputTypeCountUserWindowsArgs
  }

  // Custom InputTypes
  /**
   * WindowCountOutputType without action
   */
  export type WindowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WindowCountOutputType
     */
    select?: WindowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WindowCountOutputType without action
   */
  export type WindowCountOutputTypeCountQueuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueWhereInput
  }

  /**
   * WindowCountOutputType without action
   */
  export type WindowCountOutputTypeCountUserWindowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWindowWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    password: string | null
    fullName: string | null
    nickname: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    password: string | null
    fullName: string | null
    nickname: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    fullName: number
    nickname: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    fullName?: true
    nickname?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    fullName?: true
    nickname?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    fullName?: true
    nickname?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    username: string
    password: string
    fullName: string
    nickname: string
    role: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    fullName?: boolean
    nickname?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    userWindows?: boolean | User$userWindowsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    fullName?: boolean
    nickname?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    fullName?: boolean
    nickname?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password" | "fullName" | "nickname" | "role" | "isActive" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userWindows?: boolean | User$userWindowsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      userWindows: Prisma.$UserWindowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      username: string
      password: string
      fullName: string
      nickname: string
      role: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userWindows<T extends User$userWindowsArgs<ExtArgs> = {}>(args?: Subset<T, User$userWindowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly nickname: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.userWindows
   */
  export type User$userWindowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    where?: UserWindowWhereInput
    orderBy?: UserWindowOrderByWithRelationInput | UserWindowOrderByWithRelationInput[]
    cursor?: UserWindowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWindowScalarFieldEnum | UserWindowScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Queue
   */

  export type AggregateQueue = {
    _count: QueueCountAggregateOutputType | null
    _avg: QueueAvgAggregateOutputType | null
    _sum: QueueSumAggregateOutputType | null
    _min: QueueMinAggregateOutputType | null
    _max: QueueMaxAggregateOutputType | null
  }

  export type QueueAvgAggregateOutputType = {
    id: number | null
    ticketNumber: number | null
    windowId: number | null
  }

  export type QueueSumAggregateOutputType = {
    id: number | null
    ticketNumber: number | null
    windowId: number | null
  }

  export type QueueMinAggregateOutputType = {
    id: number | null
    studentId: string | null
    firstName: string | null
    lastName: string | null
    ticketNumber: number | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
    windowId: number | null
  }

  export type QueueMaxAggregateOutputType = {
    id: number | null
    studentId: string | null
    firstName: string | null
    lastName: string | null
    ticketNumber: number | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
    windowId: number | null
  }

  export type QueueCountAggregateOutputType = {
    id: number
    studentId: number
    firstName: number
    lastName: number
    ticketNumber: number
    status: number
    createdAt: number
    deletedAt: number
    windowId: number
    _all: number
  }


  export type QueueAvgAggregateInputType = {
    id?: true
    ticketNumber?: true
    windowId?: true
  }

  export type QueueSumAggregateInputType = {
    id?: true
    ticketNumber?: true
    windowId?: true
  }

  export type QueueMinAggregateInputType = {
    id?: true
    studentId?: true
    firstName?: true
    lastName?: true
    ticketNumber?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    windowId?: true
  }

  export type QueueMaxAggregateInputType = {
    id?: true
    studentId?: true
    firstName?: true
    lastName?: true
    ticketNumber?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    windowId?: true
  }

  export type QueueCountAggregateInputType = {
    id?: true
    studentId?: true
    firstName?: true
    lastName?: true
    ticketNumber?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    windowId?: true
    _all?: true
  }

  export type QueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Queue to aggregate.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Queues
    **/
    _count?: true | QueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueMaxAggregateInputType
  }

  export type GetQueueAggregateType<T extends QueueAggregateArgs> = {
        [P in keyof T & keyof AggregateQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueue[P]>
      : GetScalarType<T[P], AggregateQueue[P]>
  }




  export type QueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueWhereInput
    orderBy?: QueueOrderByWithAggregationInput | QueueOrderByWithAggregationInput[]
    by: QueueScalarFieldEnum[] | QueueScalarFieldEnum
    having?: QueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueCountAggregateInputType | true
    _avg?: QueueAvgAggregateInputType
    _sum?: QueueSumAggregateInputType
    _min?: QueueMinAggregateInputType
    _max?: QueueMaxAggregateInputType
  }

  export type QueueGroupByOutputType = {
    id: number
    studentId: string
    firstName: string
    lastName: string
    ticketNumber: number
    status: string
    createdAt: Date
    deletedAt: Date | null
    windowId: number | null
    _count: QueueCountAggregateOutputType | null
    _avg: QueueAvgAggregateOutputType | null
    _sum: QueueSumAggregateOutputType | null
    _min: QueueMinAggregateOutputType | null
    _max: QueueMaxAggregateOutputType | null
  }

  type GetQueueGroupByPayload<T extends QueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueGroupByOutputType[P]>
            : GetScalarType<T[P], QueueGroupByOutputType[P]>
        }
      >
    >


  export type QueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    firstName?: boolean
    lastName?: boolean
    ticketNumber?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    windowId?: boolean
    window?: boolean | Queue$windowArgs<ExtArgs>
  }, ExtArgs["result"]["queue"]>

  export type QueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    firstName?: boolean
    lastName?: boolean
    ticketNumber?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    windowId?: boolean
    window?: boolean | Queue$windowArgs<ExtArgs>
  }, ExtArgs["result"]["queue"]>


  export type QueueSelectScalar = {
    id?: boolean
    studentId?: boolean
    firstName?: boolean
    lastName?: boolean
    ticketNumber?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    windowId?: boolean
  }

  export type QueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "firstName" | "lastName" | "ticketNumber" | "status" | "createdAt" | "deletedAt" | "windowId", ExtArgs["result"]["queue"]>
  export type QueueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    window?: boolean | Queue$windowArgs<ExtArgs>
  }
  export type QueueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    window?: boolean | Queue$windowArgs<ExtArgs>
  }

  export type $QueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Queue"
    objects: {
      window: Prisma.$WindowPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: string
      firstName: string
      lastName: string
      ticketNumber: number
      status: string
      createdAt: Date
      deletedAt: Date | null
      windowId: number | null
    }, ExtArgs["result"]["queue"]>
    composites: {}
  }

  type QueueGetPayload<S extends boolean | null | undefined | QueueDefaultArgs> = $Result.GetResult<Prisma.$QueuePayload, S>

  type QueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueCountAggregateInputType | true
    }

  export interface QueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Queue'], meta: { name: 'Queue' } }
    /**
     * Find zero or one Queue that matches the filter.
     * @param {QueueFindUniqueArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueFindUniqueArgs>(args: SelectSubset<T, QueueFindUniqueArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Queue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueFindUniqueOrThrowArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Queue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueFindFirstArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueFindFirstArgs>(args?: SelectSubset<T, QueueFindFirstArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Queue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueFindFirstOrThrowArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Queues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Queues
     * const queues = await prisma.queue.findMany()
     * 
     * // Get first 10 Queues
     * const queues = await prisma.queue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueWithIdOnly = await prisma.queue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueFindManyArgs>(args?: SelectSubset<T, QueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Queue.
     * @param {QueueCreateArgs} args - Arguments to create a Queue.
     * @example
     * // Create one Queue
     * const Queue = await prisma.queue.create({
     *   data: {
     *     // ... data to create a Queue
     *   }
     * })
     * 
     */
    create<T extends QueueCreateArgs>(args: SelectSubset<T, QueueCreateArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Queues.
     * @param {QueueCreateManyArgs} args - Arguments to create many Queues.
     * @example
     * // Create many Queues
     * const queue = await prisma.queue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueCreateManyArgs>(args?: SelectSubset<T, QueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Queues and returns the data saved in the database.
     * @param {QueueCreateManyAndReturnArgs} args - Arguments to create many Queues.
     * @example
     * // Create many Queues
     * const queue = await prisma.queue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Queues and only return the `id`
     * const queueWithIdOnly = await prisma.queue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Queue.
     * @param {QueueDeleteArgs} args - Arguments to delete one Queue.
     * @example
     * // Delete one Queue
     * const Queue = await prisma.queue.delete({
     *   where: {
     *     // ... filter to delete one Queue
     *   }
     * })
     * 
     */
    delete<T extends QueueDeleteArgs>(args: SelectSubset<T, QueueDeleteArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Queue.
     * @param {QueueUpdateArgs} args - Arguments to update one Queue.
     * @example
     * // Update one Queue
     * const queue = await prisma.queue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueUpdateArgs>(args: SelectSubset<T, QueueUpdateArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Queues.
     * @param {QueueDeleteManyArgs} args - Arguments to filter Queues to delete.
     * @example
     * // Delete a few Queues
     * const { count } = await prisma.queue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueDeleteManyArgs>(args?: SelectSubset<T, QueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Queues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Queues
     * const queue = await prisma.queue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueUpdateManyArgs>(args: SelectSubset<T, QueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Queue.
     * @param {QueueUpsertArgs} args - Arguments to update or create a Queue.
     * @example
     * // Update or create a Queue
     * const queue = await prisma.queue.upsert({
     *   create: {
     *     // ... data to create a Queue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Queue we want to update
     *   }
     * })
     */
    upsert<T extends QueueUpsertArgs>(args: SelectSubset<T, QueueUpsertArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Queues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueCountArgs} args - Arguments to filter Queues to count.
     * @example
     * // Count the number of Queues
     * const count = await prisma.queue.count({
     *   where: {
     *     // ... the filter for the Queues we want to count
     *   }
     * })
    **/
    count<T extends QueueCountArgs>(
      args?: Subset<T, QueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Queue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueAggregateArgs>(args: Subset<T, QueueAggregateArgs>): Prisma.PrismaPromise<GetQueueAggregateType<T>>

    /**
     * Group by Queue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueGroupByArgs['orderBy'] }
        : { orderBy?: QueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Queue model
   */
  readonly fields: QueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Queue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    window<T extends Queue$windowArgs<ExtArgs> = {}>(args?: Subset<T, Queue$windowArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Queue model
   */
  interface QueueFieldRefs {
    readonly id: FieldRef<"Queue", 'Int'>
    readonly studentId: FieldRef<"Queue", 'String'>
    readonly firstName: FieldRef<"Queue", 'String'>
    readonly lastName: FieldRef<"Queue", 'String'>
    readonly ticketNumber: FieldRef<"Queue", 'Int'>
    readonly status: FieldRef<"Queue", 'String'>
    readonly createdAt: FieldRef<"Queue", 'DateTime'>
    readonly deletedAt: FieldRef<"Queue", 'DateTime'>
    readonly windowId: FieldRef<"Queue", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Queue findUnique
   */
  export type QueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue findUniqueOrThrow
   */
  export type QueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue findFirst
   */
  export type QueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Queues.
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Queues.
     */
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Queue findFirstOrThrow
   */
  export type QueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Queues.
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Queues.
     */
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Queue findMany
   */
  export type QueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queues to fetch.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Queues.
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Queue create
   */
  export type QueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * The data needed to create a Queue.
     */
    data: XOR<QueueCreateInput, QueueUncheckedCreateInput>
  }

  /**
   * Queue createMany
   */
  export type QueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Queues.
     */
    data: QueueCreateManyInput | QueueCreateManyInput[]
  }

  /**
   * Queue createManyAndReturn
   */
  export type QueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * The data used to create many Queues.
     */
    data: QueueCreateManyInput | QueueCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Queue update
   */
  export type QueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * The data needed to update a Queue.
     */
    data: XOR<QueueUpdateInput, QueueUncheckedUpdateInput>
    /**
     * Choose, which Queue to update.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue updateMany
   */
  export type QueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Queues.
     */
    data: XOR<QueueUpdateManyMutationInput, QueueUncheckedUpdateManyInput>
    /**
     * Filter which Queues to update
     */
    where?: QueueWhereInput
  }

  /**
   * Queue upsert
   */
  export type QueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * The filter to search for the Queue to update in case it exists.
     */
    where: QueueWhereUniqueInput
    /**
     * In case the Queue found by the `where` argument doesn't exist, create a new Queue with this data.
     */
    create: XOR<QueueCreateInput, QueueUncheckedCreateInput>
    /**
     * In case the Queue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueUpdateInput, QueueUncheckedUpdateInput>
  }

  /**
   * Queue delete
   */
  export type QueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter which Queue to delete.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue deleteMany
   */
  export type QueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Queues to delete
     */
    where?: QueueWhereInput
  }

  /**
   * Queue.window
   */
  export type Queue$windowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    where?: WindowWhereInput
  }

  /**
   * Queue without action
   */
  export type QueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
  }


  /**
   * Model Window
   */

  export type AggregateWindow = {
    _count: WindowCountAggregateOutputType | null
    _avg: WindowAvgAggregateOutputType | null
    _sum: WindowSumAggregateOutputType | null
    _min: WindowMinAggregateOutputType | null
    _max: WindowMaxAggregateOutputType | null
  }

  export type WindowAvgAggregateOutputType = {
    id: number | null
  }

  export type WindowSumAggregateOutputType = {
    id: number | null
  }

  export type WindowMinAggregateOutputType = {
    id: number | null
    windowTitle: string | null
    windowDescription: string | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type WindowMaxAggregateOutputType = {
    id: number | null
    windowTitle: string | null
    windowDescription: string | null
    status: string | null
    createdAt: Date | null
    deletedAt: Date | null
  }

  export type WindowCountAggregateOutputType = {
    id: number
    windowTitle: number
    windowDescription: number
    status: number
    createdAt: number
    deletedAt: number
    _all: number
  }


  export type WindowAvgAggregateInputType = {
    id?: true
  }

  export type WindowSumAggregateInputType = {
    id?: true
  }

  export type WindowMinAggregateInputType = {
    id?: true
    windowTitle?: true
    windowDescription?: true
    status?: true
    createdAt?: true
    deletedAt?: true
  }

  export type WindowMaxAggregateInputType = {
    id?: true
    windowTitle?: true
    windowDescription?: true
    status?: true
    createdAt?: true
    deletedAt?: true
  }

  export type WindowCountAggregateInputType = {
    id?: true
    windowTitle?: true
    windowDescription?: true
    status?: true
    createdAt?: true
    deletedAt?: true
    _all?: true
  }

  export type WindowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Window to aggregate.
     */
    where?: WindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Windows to fetch.
     */
    orderBy?: WindowOrderByWithRelationInput | WindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Windows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Windows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Windows
    **/
    _count?: true | WindowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WindowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WindowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WindowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WindowMaxAggregateInputType
  }

  export type GetWindowAggregateType<T extends WindowAggregateArgs> = {
        [P in keyof T & keyof AggregateWindow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWindow[P]>
      : GetScalarType<T[P], AggregateWindow[P]>
  }




  export type WindowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WindowWhereInput
    orderBy?: WindowOrderByWithAggregationInput | WindowOrderByWithAggregationInput[]
    by: WindowScalarFieldEnum[] | WindowScalarFieldEnum
    having?: WindowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WindowCountAggregateInputType | true
    _avg?: WindowAvgAggregateInputType
    _sum?: WindowSumAggregateInputType
    _min?: WindowMinAggregateInputType
    _max?: WindowMaxAggregateInputType
  }

  export type WindowGroupByOutputType = {
    id: number
    windowTitle: string
    windowDescription: string
    status: string
    createdAt: Date
    deletedAt: Date | null
    _count: WindowCountAggregateOutputType | null
    _avg: WindowAvgAggregateOutputType | null
    _sum: WindowSumAggregateOutputType | null
    _min: WindowMinAggregateOutputType | null
    _max: WindowMaxAggregateOutputType | null
  }

  type GetWindowGroupByPayload<T extends WindowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WindowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WindowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WindowGroupByOutputType[P]>
            : GetScalarType<T[P], WindowGroupByOutputType[P]>
        }
      >
    >


  export type WindowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    windowTitle?: boolean
    windowDescription?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    queues?: boolean | Window$queuesArgs<ExtArgs>
    userWindows?: boolean | Window$userWindowsArgs<ExtArgs>
    _count?: boolean | WindowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["window"]>

  export type WindowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    windowTitle?: boolean
    windowDescription?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["window"]>


  export type WindowSelectScalar = {
    id?: boolean
    windowTitle?: boolean
    windowDescription?: boolean
    status?: boolean
    createdAt?: boolean
    deletedAt?: boolean
  }

  export type WindowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "windowTitle" | "windowDescription" | "status" | "createdAt" | "deletedAt", ExtArgs["result"]["window"]>
  export type WindowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queues?: boolean | Window$queuesArgs<ExtArgs>
    userWindows?: boolean | Window$userWindowsArgs<ExtArgs>
    _count?: boolean | WindowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WindowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WindowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Window"
    objects: {
      queues: Prisma.$QueuePayload<ExtArgs>[]
      userWindows: Prisma.$UserWindowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      windowTitle: string
      windowDescription: string
      status: string
      createdAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["window"]>
    composites: {}
  }

  type WindowGetPayload<S extends boolean | null | undefined | WindowDefaultArgs> = $Result.GetResult<Prisma.$WindowPayload, S>

  type WindowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WindowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WindowCountAggregateInputType | true
    }

  export interface WindowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Window'], meta: { name: 'Window' } }
    /**
     * Find zero or one Window that matches the filter.
     * @param {WindowFindUniqueArgs} args - Arguments to find a Window
     * @example
     * // Get one Window
     * const window = await prisma.window.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WindowFindUniqueArgs>(args: SelectSubset<T, WindowFindUniqueArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Window that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WindowFindUniqueOrThrowArgs} args - Arguments to find a Window
     * @example
     * // Get one Window
     * const window = await prisma.window.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WindowFindUniqueOrThrowArgs>(args: SelectSubset<T, WindowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Window that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WindowFindFirstArgs} args - Arguments to find a Window
     * @example
     * // Get one Window
     * const window = await prisma.window.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WindowFindFirstArgs>(args?: SelectSubset<T, WindowFindFirstArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Window that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WindowFindFirstOrThrowArgs} args - Arguments to find a Window
     * @example
     * // Get one Window
     * const window = await prisma.window.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WindowFindFirstOrThrowArgs>(args?: SelectSubset<T, WindowFindFirstOrThrowArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Windows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WindowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Windows
     * const windows = await prisma.window.findMany()
     * 
     * // Get first 10 Windows
     * const windows = await prisma.window.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const windowWithIdOnly = await prisma.window.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WindowFindManyArgs>(args?: SelectSubset<T, WindowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Window.
     * @param {WindowCreateArgs} args - Arguments to create a Window.
     * @example
     * // Create one Window
     * const Window = await prisma.window.create({
     *   data: {
     *     // ... data to create a Window
     *   }
     * })
     * 
     */
    create<T extends WindowCreateArgs>(args: SelectSubset<T, WindowCreateArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Windows.
     * @param {WindowCreateManyArgs} args - Arguments to create many Windows.
     * @example
     * // Create many Windows
     * const window = await prisma.window.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WindowCreateManyArgs>(args?: SelectSubset<T, WindowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Windows and returns the data saved in the database.
     * @param {WindowCreateManyAndReturnArgs} args - Arguments to create many Windows.
     * @example
     * // Create many Windows
     * const window = await prisma.window.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Windows and only return the `id`
     * const windowWithIdOnly = await prisma.window.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WindowCreateManyAndReturnArgs>(args?: SelectSubset<T, WindowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Window.
     * @param {WindowDeleteArgs} args - Arguments to delete one Window.
     * @example
     * // Delete one Window
     * const Window = await prisma.window.delete({
     *   where: {
     *     // ... filter to delete one Window
     *   }
     * })
     * 
     */
    delete<T extends WindowDeleteArgs>(args: SelectSubset<T, WindowDeleteArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Window.
     * @param {WindowUpdateArgs} args - Arguments to update one Window.
     * @example
     * // Update one Window
     * const window = await prisma.window.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WindowUpdateArgs>(args: SelectSubset<T, WindowUpdateArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Windows.
     * @param {WindowDeleteManyArgs} args - Arguments to filter Windows to delete.
     * @example
     * // Delete a few Windows
     * const { count } = await prisma.window.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WindowDeleteManyArgs>(args?: SelectSubset<T, WindowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Windows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WindowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Windows
     * const window = await prisma.window.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WindowUpdateManyArgs>(args: SelectSubset<T, WindowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Window.
     * @param {WindowUpsertArgs} args - Arguments to update or create a Window.
     * @example
     * // Update or create a Window
     * const window = await prisma.window.upsert({
     *   create: {
     *     // ... data to create a Window
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Window we want to update
     *   }
     * })
     */
    upsert<T extends WindowUpsertArgs>(args: SelectSubset<T, WindowUpsertArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Windows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WindowCountArgs} args - Arguments to filter Windows to count.
     * @example
     * // Count the number of Windows
     * const count = await prisma.window.count({
     *   where: {
     *     // ... the filter for the Windows we want to count
     *   }
     * })
    **/
    count<T extends WindowCountArgs>(
      args?: Subset<T, WindowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WindowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Window.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WindowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WindowAggregateArgs>(args: Subset<T, WindowAggregateArgs>): Prisma.PrismaPromise<GetWindowAggregateType<T>>

    /**
     * Group by Window.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WindowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WindowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WindowGroupByArgs['orderBy'] }
        : { orderBy?: WindowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WindowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWindowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Window model
   */
  readonly fields: WindowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Window.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WindowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    queues<T extends Window$queuesArgs<ExtArgs> = {}>(args?: Subset<T, Window$queuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userWindows<T extends Window$userWindowsArgs<ExtArgs> = {}>(args?: Subset<T, Window$userWindowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Window model
   */
  interface WindowFieldRefs {
    readonly id: FieldRef<"Window", 'Int'>
    readonly windowTitle: FieldRef<"Window", 'String'>
    readonly windowDescription: FieldRef<"Window", 'String'>
    readonly status: FieldRef<"Window", 'String'>
    readonly createdAt: FieldRef<"Window", 'DateTime'>
    readonly deletedAt: FieldRef<"Window", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Window findUnique
   */
  export type WindowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * Filter, which Window to fetch.
     */
    where: WindowWhereUniqueInput
  }

  /**
   * Window findUniqueOrThrow
   */
  export type WindowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * Filter, which Window to fetch.
     */
    where: WindowWhereUniqueInput
  }

  /**
   * Window findFirst
   */
  export type WindowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * Filter, which Window to fetch.
     */
    where?: WindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Windows to fetch.
     */
    orderBy?: WindowOrderByWithRelationInput | WindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Windows.
     */
    cursor?: WindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Windows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Windows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Windows.
     */
    distinct?: WindowScalarFieldEnum | WindowScalarFieldEnum[]
  }

  /**
   * Window findFirstOrThrow
   */
  export type WindowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * Filter, which Window to fetch.
     */
    where?: WindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Windows to fetch.
     */
    orderBy?: WindowOrderByWithRelationInput | WindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Windows.
     */
    cursor?: WindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Windows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Windows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Windows.
     */
    distinct?: WindowScalarFieldEnum | WindowScalarFieldEnum[]
  }

  /**
   * Window findMany
   */
  export type WindowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * Filter, which Windows to fetch.
     */
    where?: WindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Windows to fetch.
     */
    orderBy?: WindowOrderByWithRelationInput | WindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Windows.
     */
    cursor?: WindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Windows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Windows.
     */
    skip?: number
    distinct?: WindowScalarFieldEnum | WindowScalarFieldEnum[]
  }

  /**
   * Window create
   */
  export type WindowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * The data needed to create a Window.
     */
    data: XOR<WindowCreateInput, WindowUncheckedCreateInput>
  }

  /**
   * Window createMany
   */
  export type WindowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Windows.
     */
    data: WindowCreateManyInput | WindowCreateManyInput[]
  }

  /**
   * Window createManyAndReturn
   */
  export type WindowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * The data used to create many Windows.
     */
    data: WindowCreateManyInput | WindowCreateManyInput[]
  }

  /**
   * Window update
   */
  export type WindowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * The data needed to update a Window.
     */
    data: XOR<WindowUpdateInput, WindowUncheckedUpdateInput>
    /**
     * Choose, which Window to update.
     */
    where: WindowWhereUniqueInput
  }

  /**
   * Window updateMany
   */
  export type WindowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Windows.
     */
    data: XOR<WindowUpdateManyMutationInput, WindowUncheckedUpdateManyInput>
    /**
     * Filter which Windows to update
     */
    where?: WindowWhereInput
  }

  /**
   * Window upsert
   */
  export type WindowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * The filter to search for the Window to update in case it exists.
     */
    where: WindowWhereUniqueInput
    /**
     * In case the Window found by the `where` argument doesn't exist, create a new Window with this data.
     */
    create: XOR<WindowCreateInput, WindowUncheckedCreateInput>
    /**
     * In case the Window was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WindowUpdateInput, WindowUncheckedUpdateInput>
  }

  /**
   * Window delete
   */
  export type WindowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
    /**
     * Filter which Window to delete.
     */
    where: WindowWhereUniqueInput
  }

  /**
   * Window deleteMany
   */
  export type WindowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Windows to delete
     */
    where?: WindowWhereInput
  }

  /**
   * Window.queues
   */
  export type Window$queuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    where?: QueueWhereInput
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    cursor?: QueueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Window.userWindows
   */
  export type Window$userWindowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    where?: UserWindowWhereInput
    orderBy?: UserWindowOrderByWithRelationInput | UserWindowOrderByWithRelationInput[]
    cursor?: UserWindowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserWindowScalarFieldEnum | UserWindowScalarFieldEnum[]
  }

  /**
   * Window without action
   */
  export type WindowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Window
     */
    select?: WindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Window
     */
    omit?: WindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WindowInclude<ExtArgs> | null
  }


  /**
   * Model UserWindow
   */

  export type AggregateUserWindow = {
    _count: UserWindowCountAggregateOutputType | null
    _avg: UserWindowAvgAggregateOutputType | null
    _sum: UserWindowSumAggregateOutputType | null
    _min: UserWindowMinAggregateOutputType | null
    _max: UserWindowMaxAggregateOutputType | null
  }

  export type UserWindowAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    windowId: number | null
  }

  export type UserWindowSumAggregateOutputType = {
    id: number | null
    userId: number | null
    windowId: number | null
  }

  export type UserWindowMinAggregateOutputType = {
    id: number | null
    userId: number | null
    windowId: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserWindowMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    windowId: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserWindowCountAggregateOutputType = {
    id: number
    userId: number
    windowId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserWindowAvgAggregateInputType = {
    id?: true
    userId?: true
    windowId?: true
  }

  export type UserWindowSumAggregateInputType = {
    id?: true
    userId?: true
    windowId?: true
  }

  export type UserWindowMinAggregateInputType = {
    id?: true
    userId?: true
    windowId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserWindowMaxAggregateInputType = {
    id?: true
    userId?: true
    windowId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserWindowCountAggregateInputType = {
    id?: true
    userId?: true
    windowId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserWindowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWindow to aggregate.
     */
    where?: UserWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWindows to fetch.
     */
    orderBy?: UserWindowOrderByWithRelationInput | UserWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWindows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserWindows
    **/
    _count?: true | UserWindowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserWindowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserWindowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserWindowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserWindowMaxAggregateInputType
  }

  export type GetUserWindowAggregateType<T extends UserWindowAggregateArgs> = {
        [P in keyof T & keyof AggregateUserWindow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserWindow[P]>
      : GetScalarType<T[P], AggregateUserWindow[P]>
  }




  export type UserWindowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWindowWhereInput
    orderBy?: UserWindowOrderByWithAggregationInput | UserWindowOrderByWithAggregationInput[]
    by: UserWindowScalarFieldEnum[] | UserWindowScalarFieldEnum
    having?: UserWindowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserWindowCountAggregateInputType | true
    _avg?: UserWindowAvgAggregateInputType
    _sum?: UserWindowSumAggregateInputType
    _min?: UserWindowMinAggregateInputType
    _max?: UserWindowMaxAggregateInputType
  }

  export type UserWindowGroupByOutputType = {
    id: number
    userId: number
    windowId: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserWindowCountAggregateOutputType | null
    _avg: UserWindowAvgAggregateOutputType | null
    _sum: UserWindowSumAggregateOutputType | null
    _min: UserWindowMinAggregateOutputType | null
    _max: UserWindowMaxAggregateOutputType | null
  }

  type GetUserWindowGroupByPayload<T extends UserWindowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserWindowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserWindowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserWindowGroupByOutputType[P]>
            : GetScalarType<T[P], UserWindowGroupByOutputType[P]>
        }
      >
    >


  export type UserWindowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    windowId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    window?: boolean | WindowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWindow"]>

  export type UserWindowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    windowId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    window?: boolean | WindowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userWindow"]>


  export type UserWindowSelectScalar = {
    id?: boolean
    userId?: boolean
    windowId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserWindowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "windowId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["userWindow"]>
  export type UserWindowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    window?: boolean | WindowDefaultArgs<ExtArgs>
  }
  export type UserWindowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    window?: boolean | WindowDefaultArgs<ExtArgs>
  }

  export type $UserWindowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserWindow"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      window: Prisma.$WindowPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      windowId: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userWindow"]>
    composites: {}
  }

  type UserWindowGetPayload<S extends boolean | null | undefined | UserWindowDefaultArgs> = $Result.GetResult<Prisma.$UserWindowPayload, S>

  type UserWindowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserWindowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserWindowCountAggregateInputType | true
    }

  export interface UserWindowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserWindow'], meta: { name: 'UserWindow' } }
    /**
     * Find zero or one UserWindow that matches the filter.
     * @param {UserWindowFindUniqueArgs} args - Arguments to find a UserWindow
     * @example
     * // Get one UserWindow
     * const userWindow = await prisma.userWindow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserWindowFindUniqueArgs>(args: SelectSubset<T, UserWindowFindUniqueArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserWindow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserWindowFindUniqueOrThrowArgs} args - Arguments to find a UserWindow
     * @example
     * // Get one UserWindow
     * const userWindow = await prisma.userWindow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserWindowFindUniqueOrThrowArgs>(args: SelectSubset<T, UserWindowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWindow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWindowFindFirstArgs} args - Arguments to find a UserWindow
     * @example
     * // Get one UserWindow
     * const userWindow = await prisma.userWindow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserWindowFindFirstArgs>(args?: SelectSubset<T, UserWindowFindFirstArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserWindow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWindowFindFirstOrThrowArgs} args - Arguments to find a UserWindow
     * @example
     * // Get one UserWindow
     * const userWindow = await prisma.userWindow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserWindowFindFirstOrThrowArgs>(args?: SelectSubset<T, UserWindowFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserWindows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWindowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserWindows
     * const userWindows = await prisma.userWindow.findMany()
     * 
     * // Get first 10 UserWindows
     * const userWindows = await prisma.userWindow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWindowWithIdOnly = await prisma.userWindow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserWindowFindManyArgs>(args?: SelectSubset<T, UserWindowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserWindow.
     * @param {UserWindowCreateArgs} args - Arguments to create a UserWindow.
     * @example
     * // Create one UserWindow
     * const UserWindow = await prisma.userWindow.create({
     *   data: {
     *     // ... data to create a UserWindow
     *   }
     * })
     * 
     */
    create<T extends UserWindowCreateArgs>(args: SelectSubset<T, UserWindowCreateArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserWindows.
     * @param {UserWindowCreateManyArgs} args - Arguments to create many UserWindows.
     * @example
     * // Create many UserWindows
     * const userWindow = await prisma.userWindow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserWindowCreateManyArgs>(args?: SelectSubset<T, UserWindowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserWindows and returns the data saved in the database.
     * @param {UserWindowCreateManyAndReturnArgs} args - Arguments to create many UserWindows.
     * @example
     * // Create many UserWindows
     * const userWindow = await prisma.userWindow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserWindows and only return the `id`
     * const userWindowWithIdOnly = await prisma.userWindow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserWindowCreateManyAndReturnArgs>(args?: SelectSubset<T, UserWindowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserWindow.
     * @param {UserWindowDeleteArgs} args - Arguments to delete one UserWindow.
     * @example
     * // Delete one UserWindow
     * const UserWindow = await prisma.userWindow.delete({
     *   where: {
     *     // ... filter to delete one UserWindow
     *   }
     * })
     * 
     */
    delete<T extends UserWindowDeleteArgs>(args: SelectSubset<T, UserWindowDeleteArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserWindow.
     * @param {UserWindowUpdateArgs} args - Arguments to update one UserWindow.
     * @example
     * // Update one UserWindow
     * const userWindow = await prisma.userWindow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserWindowUpdateArgs>(args: SelectSubset<T, UserWindowUpdateArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserWindows.
     * @param {UserWindowDeleteManyArgs} args - Arguments to filter UserWindows to delete.
     * @example
     * // Delete a few UserWindows
     * const { count } = await prisma.userWindow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserWindowDeleteManyArgs>(args?: SelectSubset<T, UserWindowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserWindows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWindowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserWindows
     * const userWindow = await prisma.userWindow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserWindowUpdateManyArgs>(args: SelectSubset<T, UserWindowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserWindow.
     * @param {UserWindowUpsertArgs} args - Arguments to update or create a UserWindow.
     * @example
     * // Update or create a UserWindow
     * const userWindow = await prisma.userWindow.upsert({
     *   create: {
     *     // ... data to create a UserWindow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserWindow we want to update
     *   }
     * })
     */
    upsert<T extends UserWindowUpsertArgs>(args: SelectSubset<T, UserWindowUpsertArgs<ExtArgs>>): Prisma__UserWindowClient<$Result.GetResult<Prisma.$UserWindowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserWindows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWindowCountArgs} args - Arguments to filter UserWindows to count.
     * @example
     * // Count the number of UserWindows
     * const count = await prisma.userWindow.count({
     *   where: {
     *     // ... the filter for the UserWindows we want to count
     *   }
     * })
    **/
    count<T extends UserWindowCountArgs>(
      args?: Subset<T, UserWindowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserWindowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserWindow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWindowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserWindowAggregateArgs>(args: Subset<T, UserWindowAggregateArgs>): Prisma.PrismaPromise<GetUserWindowAggregateType<T>>

    /**
     * Group by UserWindow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserWindowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserWindowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserWindowGroupByArgs['orderBy'] }
        : { orderBy?: UserWindowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserWindowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserWindowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserWindow model
   */
  readonly fields: UserWindowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserWindow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserWindowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    window<T extends WindowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WindowDefaultArgs<ExtArgs>>): Prisma__WindowClient<$Result.GetResult<Prisma.$WindowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserWindow model
   */
  interface UserWindowFieldRefs {
    readonly id: FieldRef<"UserWindow", 'Int'>
    readonly userId: FieldRef<"UserWindow", 'Int'>
    readonly windowId: FieldRef<"UserWindow", 'Int'>
    readonly isActive: FieldRef<"UserWindow", 'Boolean'>
    readonly createdAt: FieldRef<"UserWindow", 'DateTime'>
    readonly updatedAt: FieldRef<"UserWindow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserWindow findUnique
   */
  export type UserWindowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * Filter, which UserWindow to fetch.
     */
    where: UserWindowWhereUniqueInput
  }

  /**
   * UserWindow findUniqueOrThrow
   */
  export type UserWindowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * Filter, which UserWindow to fetch.
     */
    where: UserWindowWhereUniqueInput
  }

  /**
   * UserWindow findFirst
   */
  export type UserWindowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * Filter, which UserWindow to fetch.
     */
    where?: UserWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWindows to fetch.
     */
    orderBy?: UserWindowOrderByWithRelationInput | UserWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWindows.
     */
    cursor?: UserWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWindows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWindows.
     */
    distinct?: UserWindowScalarFieldEnum | UserWindowScalarFieldEnum[]
  }

  /**
   * UserWindow findFirstOrThrow
   */
  export type UserWindowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * Filter, which UserWindow to fetch.
     */
    where?: UserWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWindows to fetch.
     */
    orderBy?: UserWindowOrderByWithRelationInput | UserWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserWindows.
     */
    cursor?: UserWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWindows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserWindows.
     */
    distinct?: UserWindowScalarFieldEnum | UserWindowScalarFieldEnum[]
  }

  /**
   * UserWindow findMany
   */
  export type UserWindowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * Filter, which UserWindows to fetch.
     */
    where?: UserWindowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserWindows to fetch.
     */
    orderBy?: UserWindowOrderByWithRelationInput | UserWindowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserWindows.
     */
    cursor?: UserWindowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserWindows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserWindows.
     */
    skip?: number
    distinct?: UserWindowScalarFieldEnum | UserWindowScalarFieldEnum[]
  }

  /**
   * UserWindow create
   */
  export type UserWindowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * The data needed to create a UserWindow.
     */
    data: XOR<UserWindowCreateInput, UserWindowUncheckedCreateInput>
  }

  /**
   * UserWindow createMany
   */
  export type UserWindowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserWindows.
     */
    data: UserWindowCreateManyInput | UserWindowCreateManyInput[]
  }

  /**
   * UserWindow createManyAndReturn
   */
  export type UserWindowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * The data used to create many UserWindows.
     */
    data: UserWindowCreateManyInput | UserWindowCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserWindow update
   */
  export type UserWindowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * The data needed to update a UserWindow.
     */
    data: XOR<UserWindowUpdateInput, UserWindowUncheckedUpdateInput>
    /**
     * Choose, which UserWindow to update.
     */
    where: UserWindowWhereUniqueInput
  }

  /**
   * UserWindow updateMany
   */
  export type UserWindowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserWindows.
     */
    data: XOR<UserWindowUpdateManyMutationInput, UserWindowUncheckedUpdateManyInput>
    /**
     * Filter which UserWindows to update
     */
    where?: UserWindowWhereInput
  }

  /**
   * UserWindow upsert
   */
  export type UserWindowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * The filter to search for the UserWindow to update in case it exists.
     */
    where: UserWindowWhereUniqueInput
    /**
     * In case the UserWindow found by the `where` argument doesn't exist, create a new UserWindow with this data.
     */
    create: XOR<UserWindowCreateInput, UserWindowUncheckedCreateInput>
    /**
     * In case the UserWindow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserWindowUpdateInput, UserWindowUncheckedUpdateInput>
  }

  /**
   * UserWindow delete
   */
  export type UserWindowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
    /**
     * Filter which UserWindow to delete.
     */
    where: UserWindowWhereUniqueInput
  }

  /**
   * UserWindow deleteMany
   */
  export type UserWindowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserWindows to delete
     */
    where?: UserWindowWhereInput
  }

  /**
   * UserWindow without action
   */
  export type UserWindowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserWindow
     */
    select?: UserWindowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserWindow
     */
    omit?: UserWindowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserWindowInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    fullName: 'fullName',
    nickname: 'nickname',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const QueueScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    firstName: 'firstName',
    lastName: 'lastName',
    ticketNumber: 'ticketNumber',
    status: 'status',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt',
    windowId: 'windowId'
  };

  export type QueueScalarFieldEnum = (typeof QueueScalarFieldEnum)[keyof typeof QueueScalarFieldEnum]


  export const WindowScalarFieldEnum: {
    id: 'id',
    windowTitle: 'windowTitle',
    windowDescription: 'windowDescription',
    status: 'status',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt'
  };

  export type WindowScalarFieldEnum = (typeof WindowScalarFieldEnum)[keyof typeof WindowScalarFieldEnum]


  export const UserWindowScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    windowId: 'windowId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserWindowScalarFieldEnum = (typeof UserWindowScalarFieldEnum)[keyof typeof UserWindowScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    nickname?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    userWindows?: UserWindowListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    userWindows?: UserWindowOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    nickname?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    userWindows?: UserWindowListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    nickname?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type QueueWhereInput = {
    AND?: QueueWhereInput | QueueWhereInput[]
    OR?: QueueWhereInput[]
    NOT?: QueueWhereInput | QueueWhereInput[]
    id?: IntFilter<"Queue"> | number
    studentId?: StringFilter<"Queue"> | string
    firstName?: StringFilter<"Queue"> | string
    lastName?: StringFilter<"Queue"> | string
    ticketNumber?: IntFilter<"Queue"> | number
    status?: StringFilter<"Queue"> | string
    createdAt?: DateTimeFilter<"Queue"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Queue"> | Date | string | null
    windowId?: IntNullableFilter<"Queue"> | number | null
    window?: XOR<WindowNullableRelationFilter, WindowWhereInput> | null
  }

  export type QueueOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    ticketNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    windowId?: SortOrderInput | SortOrder
    window?: WindowOrderByWithRelationInput
  }

  export type QueueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QueueWhereInput | QueueWhereInput[]
    OR?: QueueWhereInput[]
    NOT?: QueueWhereInput | QueueWhereInput[]
    studentId?: StringFilter<"Queue"> | string
    firstName?: StringFilter<"Queue"> | string
    lastName?: StringFilter<"Queue"> | string
    ticketNumber?: IntFilter<"Queue"> | number
    status?: StringFilter<"Queue"> | string
    createdAt?: DateTimeFilter<"Queue"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Queue"> | Date | string | null
    windowId?: IntNullableFilter<"Queue"> | number | null
    window?: XOR<WindowNullableRelationFilter, WindowWhereInput> | null
  }, "id">

  export type QueueOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    ticketNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    windowId?: SortOrderInput | SortOrder
    _count?: QueueCountOrderByAggregateInput
    _avg?: QueueAvgOrderByAggregateInput
    _max?: QueueMaxOrderByAggregateInput
    _min?: QueueMinOrderByAggregateInput
    _sum?: QueueSumOrderByAggregateInput
  }

  export type QueueScalarWhereWithAggregatesInput = {
    AND?: QueueScalarWhereWithAggregatesInput | QueueScalarWhereWithAggregatesInput[]
    OR?: QueueScalarWhereWithAggregatesInput[]
    NOT?: QueueScalarWhereWithAggregatesInput | QueueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Queue"> | number
    studentId?: StringWithAggregatesFilter<"Queue"> | string
    firstName?: StringWithAggregatesFilter<"Queue"> | string
    lastName?: StringWithAggregatesFilter<"Queue"> | string
    ticketNumber?: IntWithAggregatesFilter<"Queue"> | number
    status?: StringWithAggregatesFilter<"Queue"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Queue"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Queue"> | Date | string | null
    windowId?: IntNullableWithAggregatesFilter<"Queue"> | number | null
  }

  export type WindowWhereInput = {
    AND?: WindowWhereInput | WindowWhereInput[]
    OR?: WindowWhereInput[]
    NOT?: WindowWhereInput | WindowWhereInput[]
    id?: IntFilter<"Window"> | number
    windowTitle?: StringFilter<"Window"> | string
    windowDescription?: StringFilter<"Window"> | string
    status?: StringFilter<"Window"> | string
    createdAt?: DateTimeFilter<"Window"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Window"> | Date | string | null
    queues?: QueueListRelationFilter
    userWindows?: UserWindowListRelationFilter
  }

  export type WindowOrderByWithRelationInput = {
    id?: SortOrder
    windowTitle?: SortOrder
    windowDescription?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    queues?: QueueOrderByRelationAggregateInput
    userWindows?: UserWindowOrderByRelationAggregateInput
  }

  export type WindowWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WindowWhereInput | WindowWhereInput[]
    OR?: WindowWhereInput[]
    NOT?: WindowWhereInput | WindowWhereInput[]
    windowTitle?: StringFilter<"Window"> | string
    windowDescription?: StringFilter<"Window"> | string
    status?: StringFilter<"Window"> | string
    createdAt?: DateTimeFilter<"Window"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Window"> | Date | string | null
    queues?: QueueListRelationFilter
    userWindows?: UserWindowListRelationFilter
  }, "id">

  export type WindowOrderByWithAggregationInput = {
    id?: SortOrder
    windowTitle?: SortOrder
    windowDescription?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: WindowCountOrderByAggregateInput
    _avg?: WindowAvgOrderByAggregateInput
    _max?: WindowMaxOrderByAggregateInput
    _min?: WindowMinOrderByAggregateInput
    _sum?: WindowSumOrderByAggregateInput
  }

  export type WindowScalarWhereWithAggregatesInput = {
    AND?: WindowScalarWhereWithAggregatesInput | WindowScalarWhereWithAggregatesInput[]
    OR?: WindowScalarWhereWithAggregatesInput[]
    NOT?: WindowScalarWhereWithAggregatesInput | WindowScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Window"> | number
    windowTitle?: StringWithAggregatesFilter<"Window"> | string
    windowDescription?: StringWithAggregatesFilter<"Window"> | string
    status?: StringWithAggregatesFilter<"Window"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Window"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Window"> | Date | string | null
  }

  export type UserWindowWhereInput = {
    AND?: UserWindowWhereInput | UserWindowWhereInput[]
    OR?: UserWindowWhereInput[]
    NOT?: UserWindowWhereInput | UserWindowWhereInput[]
    id?: IntFilter<"UserWindow"> | number
    userId?: IntFilter<"UserWindow"> | number
    windowId?: IntFilter<"UserWindow"> | number
    isActive?: BoolFilter<"UserWindow"> | boolean
    createdAt?: DateTimeFilter<"UserWindow"> | Date | string
    updatedAt?: DateTimeFilter<"UserWindow"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    window?: XOR<WindowRelationFilter, WindowWhereInput>
  }

  export type UserWindowOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    windowId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    window?: WindowOrderByWithRelationInput
  }

  export type UserWindowWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_windowId?: UserWindowUserIdWindowIdCompoundUniqueInput
    AND?: UserWindowWhereInput | UserWindowWhereInput[]
    OR?: UserWindowWhereInput[]
    NOT?: UserWindowWhereInput | UserWindowWhereInput[]
    userId?: IntFilter<"UserWindow"> | number
    windowId?: IntFilter<"UserWindow"> | number
    isActive?: BoolFilter<"UserWindow"> | boolean
    createdAt?: DateTimeFilter<"UserWindow"> | Date | string
    updatedAt?: DateTimeFilter<"UserWindow"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    window?: XOR<WindowRelationFilter, WindowWhereInput>
  }, "id" | "userId_windowId">

  export type UserWindowOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    windowId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserWindowCountOrderByAggregateInput
    _avg?: UserWindowAvgOrderByAggregateInput
    _max?: UserWindowMaxOrderByAggregateInput
    _min?: UserWindowMinOrderByAggregateInput
    _sum?: UserWindowSumOrderByAggregateInput
  }

  export type UserWindowScalarWhereWithAggregatesInput = {
    AND?: UserWindowScalarWhereWithAggregatesInput | UserWindowScalarWhereWithAggregatesInput[]
    OR?: UserWindowScalarWhereWithAggregatesInput[]
    NOT?: UserWindowScalarWhereWithAggregatesInput | UserWindowScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserWindow"> | number
    userId?: IntWithAggregatesFilter<"UserWindow"> | number
    windowId?: IntWithAggregatesFilter<"UserWindow"> | number
    isActive?: BoolWithAggregatesFilter<"UserWindow"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserWindow"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserWindow"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    username: string
    password: string
    fullName: string
    nickname: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    userWindows?: UserWindowCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    username: string
    password: string
    fullName: string
    nickname: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    userWindows?: UserWindowUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userWindows?: UserWindowUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userWindows?: UserWindowUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    username: string
    password: string
    fullName: string
    nickname: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueCreateInput = {
    studentId: string
    firstName: string
    lastName: string
    ticketNumber: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    window?: WindowCreateNestedOneWithoutQueuesInput
  }

  export type QueueUncheckedCreateInput = {
    id?: number
    studentId: string
    firstName: string
    lastName: string
    ticketNumber: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    windowId?: number | null
  }

  export type QueueUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    ticketNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    window?: WindowUpdateOneWithoutQueuesNestedInput
  }

  export type QueueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    ticketNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    windowId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type QueueCreateManyInput = {
    id?: number
    studentId: string
    firstName: string
    lastName: string
    ticketNumber: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    windowId?: number | null
  }

  export type QueueUpdateManyMutationInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    ticketNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    ticketNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    windowId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WindowCreateInput = {
    windowTitle: string
    windowDescription: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    queues?: QueueCreateNestedManyWithoutWindowInput
    userWindows?: UserWindowCreateNestedManyWithoutWindowInput
  }

  export type WindowUncheckedCreateInput = {
    id?: number
    windowTitle: string
    windowDescription: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    queues?: QueueUncheckedCreateNestedManyWithoutWindowInput
    userWindows?: UserWindowUncheckedCreateNestedManyWithoutWindowInput
  }

  export type WindowUpdateInput = {
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queues?: QueueUpdateManyWithoutWindowNestedInput
    userWindows?: UserWindowUpdateManyWithoutWindowNestedInput
  }

  export type WindowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queues?: QueueUncheckedUpdateManyWithoutWindowNestedInput
    userWindows?: UserWindowUncheckedUpdateManyWithoutWindowNestedInput
  }

  export type WindowCreateManyInput = {
    id?: number
    windowTitle: string
    windowDescription: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type WindowUpdateManyMutationInput = {
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WindowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserWindowCreateInput = {
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserWindowsInput
    window: WindowCreateNestedOneWithoutUserWindowsInput
  }

  export type UserWindowUncheckedCreateInput = {
    id?: number
    userId: number
    windowId: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWindowUpdateInput = {
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserWindowsNestedInput
    window?: WindowUpdateOneRequiredWithoutUserWindowsNestedInput
  }

  export type UserWindowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    windowId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWindowCreateManyInput = {
    id?: number
    userId: number
    windowId: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWindowUpdateManyMutationInput = {
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWindowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    windowId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserWindowListRelationFilter = {
    every?: UserWindowWhereInput
    some?: UserWindowWhereInput
    none?: UserWindowWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserWindowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    nickname?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type WindowNullableRelationFilter = {
    is?: WindowWhereInput | null
    isNot?: WindowWhereInput | null
  }

  export type QueueCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    ticketNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    windowId?: SortOrder
  }

  export type QueueAvgOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    windowId?: SortOrder
  }

  export type QueueMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    ticketNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    windowId?: SortOrder
  }

  export type QueueMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    ticketNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    windowId?: SortOrder
  }

  export type QueueSumOrderByAggregateInput = {
    id?: SortOrder
    ticketNumber?: SortOrder
    windowId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type QueueListRelationFilter = {
    every?: QueueWhereInput
    some?: QueueWhereInput
    none?: QueueWhereInput
  }

  export type QueueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WindowCountOrderByAggregateInput = {
    id?: SortOrder
    windowTitle?: SortOrder
    windowDescription?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WindowAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WindowMaxOrderByAggregateInput = {
    id?: SortOrder
    windowTitle?: SortOrder
    windowDescription?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WindowMinOrderByAggregateInput = {
    id?: SortOrder
    windowTitle?: SortOrder
    windowDescription?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type WindowSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WindowRelationFilter = {
    is?: WindowWhereInput
    isNot?: WindowWhereInput
  }

  export type UserWindowUserIdWindowIdCompoundUniqueInput = {
    userId: number
    windowId: number
  }

  export type UserWindowCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    windowId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWindowAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    windowId?: SortOrder
  }

  export type UserWindowMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    windowId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWindowMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    windowId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWindowSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    windowId?: SortOrder
  }

  export type UserWindowCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWindowCreateWithoutUserInput, UserWindowUncheckedCreateWithoutUserInput> | UserWindowCreateWithoutUserInput[] | UserWindowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutUserInput | UserWindowCreateOrConnectWithoutUserInput[]
    createMany?: UserWindowCreateManyUserInputEnvelope
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
  }

  export type UserWindowUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserWindowCreateWithoutUserInput, UserWindowUncheckedCreateWithoutUserInput> | UserWindowCreateWithoutUserInput[] | UserWindowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutUserInput | UserWindowCreateOrConnectWithoutUserInput[]
    createMany?: UserWindowCreateManyUserInputEnvelope
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserWindowUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWindowCreateWithoutUserInput, UserWindowUncheckedCreateWithoutUserInput> | UserWindowCreateWithoutUserInput[] | UserWindowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutUserInput | UserWindowCreateOrConnectWithoutUserInput[]
    upsert?: UserWindowUpsertWithWhereUniqueWithoutUserInput | UserWindowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWindowCreateManyUserInputEnvelope
    set?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    disconnect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    delete?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    update?: UserWindowUpdateWithWhereUniqueWithoutUserInput | UserWindowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWindowUpdateManyWithWhereWithoutUserInput | UserWindowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWindowScalarWhereInput | UserWindowScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserWindowUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserWindowCreateWithoutUserInput, UserWindowUncheckedCreateWithoutUserInput> | UserWindowCreateWithoutUserInput[] | UserWindowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutUserInput | UserWindowCreateOrConnectWithoutUserInput[]
    upsert?: UserWindowUpsertWithWhereUniqueWithoutUserInput | UserWindowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserWindowCreateManyUserInputEnvelope
    set?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    disconnect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    delete?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    update?: UserWindowUpdateWithWhereUniqueWithoutUserInput | UserWindowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserWindowUpdateManyWithWhereWithoutUserInput | UserWindowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserWindowScalarWhereInput | UserWindowScalarWhereInput[]
  }

  export type WindowCreateNestedOneWithoutQueuesInput = {
    create?: XOR<WindowCreateWithoutQueuesInput, WindowUncheckedCreateWithoutQueuesInput>
    connectOrCreate?: WindowCreateOrConnectWithoutQueuesInput
    connect?: WindowWhereUniqueInput
  }

  export type WindowUpdateOneWithoutQueuesNestedInput = {
    create?: XOR<WindowCreateWithoutQueuesInput, WindowUncheckedCreateWithoutQueuesInput>
    connectOrCreate?: WindowCreateOrConnectWithoutQueuesInput
    upsert?: WindowUpsertWithoutQueuesInput
    disconnect?: WindowWhereInput | boolean
    delete?: WindowWhereInput | boolean
    connect?: WindowWhereUniqueInput
    update?: XOR<XOR<WindowUpdateToOneWithWhereWithoutQueuesInput, WindowUpdateWithoutQueuesInput>, WindowUncheckedUpdateWithoutQueuesInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QueueCreateNestedManyWithoutWindowInput = {
    create?: XOR<QueueCreateWithoutWindowInput, QueueUncheckedCreateWithoutWindowInput> | QueueCreateWithoutWindowInput[] | QueueUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutWindowInput | QueueCreateOrConnectWithoutWindowInput[]
    createMany?: QueueCreateManyWindowInputEnvelope
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
  }

  export type UserWindowCreateNestedManyWithoutWindowInput = {
    create?: XOR<UserWindowCreateWithoutWindowInput, UserWindowUncheckedCreateWithoutWindowInput> | UserWindowCreateWithoutWindowInput[] | UserWindowUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutWindowInput | UserWindowCreateOrConnectWithoutWindowInput[]
    createMany?: UserWindowCreateManyWindowInputEnvelope
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
  }

  export type QueueUncheckedCreateNestedManyWithoutWindowInput = {
    create?: XOR<QueueCreateWithoutWindowInput, QueueUncheckedCreateWithoutWindowInput> | QueueCreateWithoutWindowInput[] | QueueUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutWindowInput | QueueCreateOrConnectWithoutWindowInput[]
    createMany?: QueueCreateManyWindowInputEnvelope
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
  }

  export type UserWindowUncheckedCreateNestedManyWithoutWindowInput = {
    create?: XOR<UserWindowCreateWithoutWindowInput, UserWindowUncheckedCreateWithoutWindowInput> | UserWindowCreateWithoutWindowInput[] | UserWindowUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutWindowInput | UserWindowCreateOrConnectWithoutWindowInput[]
    createMany?: UserWindowCreateManyWindowInputEnvelope
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
  }

  export type QueueUpdateManyWithoutWindowNestedInput = {
    create?: XOR<QueueCreateWithoutWindowInput, QueueUncheckedCreateWithoutWindowInput> | QueueCreateWithoutWindowInput[] | QueueUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutWindowInput | QueueCreateOrConnectWithoutWindowInput[]
    upsert?: QueueUpsertWithWhereUniqueWithoutWindowInput | QueueUpsertWithWhereUniqueWithoutWindowInput[]
    createMany?: QueueCreateManyWindowInputEnvelope
    set?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    disconnect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    delete?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    update?: QueueUpdateWithWhereUniqueWithoutWindowInput | QueueUpdateWithWhereUniqueWithoutWindowInput[]
    updateMany?: QueueUpdateManyWithWhereWithoutWindowInput | QueueUpdateManyWithWhereWithoutWindowInput[]
    deleteMany?: QueueScalarWhereInput | QueueScalarWhereInput[]
  }

  export type UserWindowUpdateManyWithoutWindowNestedInput = {
    create?: XOR<UserWindowCreateWithoutWindowInput, UserWindowUncheckedCreateWithoutWindowInput> | UserWindowCreateWithoutWindowInput[] | UserWindowUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutWindowInput | UserWindowCreateOrConnectWithoutWindowInput[]
    upsert?: UserWindowUpsertWithWhereUniqueWithoutWindowInput | UserWindowUpsertWithWhereUniqueWithoutWindowInput[]
    createMany?: UserWindowCreateManyWindowInputEnvelope
    set?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    disconnect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    delete?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    update?: UserWindowUpdateWithWhereUniqueWithoutWindowInput | UserWindowUpdateWithWhereUniqueWithoutWindowInput[]
    updateMany?: UserWindowUpdateManyWithWhereWithoutWindowInput | UserWindowUpdateManyWithWhereWithoutWindowInput[]
    deleteMany?: UserWindowScalarWhereInput | UserWindowScalarWhereInput[]
  }

  export type QueueUncheckedUpdateManyWithoutWindowNestedInput = {
    create?: XOR<QueueCreateWithoutWindowInput, QueueUncheckedCreateWithoutWindowInput> | QueueCreateWithoutWindowInput[] | QueueUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutWindowInput | QueueCreateOrConnectWithoutWindowInput[]
    upsert?: QueueUpsertWithWhereUniqueWithoutWindowInput | QueueUpsertWithWhereUniqueWithoutWindowInput[]
    createMany?: QueueCreateManyWindowInputEnvelope
    set?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    disconnect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    delete?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    update?: QueueUpdateWithWhereUniqueWithoutWindowInput | QueueUpdateWithWhereUniqueWithoutWindowInput[]
    updateMany?: QueueUpdateManyWithWhereWithoutWindowInput | QueueUpdateManyWithWhereWithoutWindowInput[]
    deleteMany?: QueueScalarWhereInput | QueueScalarWhereInput[]
  }

  export type UserWindowUncheckedUpdateManyWithoutWindowNestedInput = {
    create?: XOR<UserWindowCreateWithoutWindowInput, UserWindowUncheckedCreateWithoutWindowInput> | UserWindowCreateWithoutWindowInput[] | UserWindowUncheckedCreateWithoutWindowInput[]
    connectOrCreate?: UserWindowCreateOrConnectWithoutWindowInput | UserWindowCreateOrConnectWithoutWindowInput[]
    upsert?: UserWindowUpsertWithWhereUniqueWithoutWindowInput | UserWindowUpsertWithWhereUniqueWithoutWindowInput[]
    createMany?: UserWindowCreateManyWindowInputEnvelope
    set?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    disconnect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    delete?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    connect?: UserWindowWhereUniqueInput | UserWindowWhereUniqueInput[]
    update?: UserWindowUpdateWithWhereUniqueWithoutWindowInput | UserWindowUpdateWithWhereUniqueWithoutWindowInput[]
    updateMany?: UserWindowUpdateManyWithWhereWithoutWindowInput | UserWindowUpdateManyWithWhereWithoutWindowInput[]
    deleteMany?: UserWindowScalarWhereInput | UserWindowScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserWindowsInput = {
    create?: XOR<UserCreateWithoutUserWindowsInput, UserUncheckedCreateWithoutUserWindowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserWindowsInput
    connect?: UserWhereUniqueInput
  }

  export type WindowCreateNestedOneWithoutUserWindowsInput = {
    create?: XOR<WindowCreateWithoutUserWindowsInput, WindowUncheckedCreateWithoutUserWindowsInput>
    connectOrCreate?: WindowCreateOrConnectWithoutUserWindowsInput
    connect?: WindowWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserWindowsNestedInput = {
    create?: XOR<UserCreateWithoutUserWindowsInput, UserUncheckedCreateWithoutUserWindowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserWindowsInput
    upsert?: UserUpsertWithoutUserWindowsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserWindowsInput, UserUpdateWithoutUserWindowsInput>, UserUncheckedUpdateWithoutUserWindowsInput>
  }

  export type WindowUpdateOneRequiredWithoutUserWindowsNestedInput = {
    create?: XOR<WindowCreateWithoutUserWindowsInput, WindowUncheckedCreateWithoutUserWindowsInput>
    connectOrCreate?: WindowCreateOrConnectWithoutUserWindowsInput
    upsert?: WindowUpsertWithoutUserWindowsInput
    connect?: WindowWhereUniqueInput
    update?: XOR<XOR<WindowUpdateToOneWithWhereWithoutUserWindowsInput, WindowUpdateWithoutUserWindowsInput>, WindowUncheckedUpdateWithoutUserWindowsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserWindowCreateWithoutUserInput = {
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    window: WindowCreateNestedOneWithoutUserWindowsInput
  }

  export type UserWindowUncheckedCreateWithoutUserInput = {
    id?: number
    windowId: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWindowCreateOrConnectWithoutUserInput = {
    where: UserWindowWhereUniqueInput
    create: XOR<UserWindowCreateWithoutUserInput, UserWindowUncheckedCreateWithoutUserInput>
  }

  export type UserWindowCreateManyUserInputEnvelope = {
    data: UserWindowCreateManyUserInput | UserWindowCreateManyUserInput[]
  }

  export type UserWindowUpsertWithWhereUniqueWithoutUserInput = {
    where: UserWindowWhereUniqueInput
    update: XOR<UserWindowUpdateWithoutUserInput, UserWindowUncheckedUpdateWithoutUserInput>
    create: XOR<UserWindowCreateWithoutUserInput, UserWindowUncheckedCreateWithoutUserInput>
  }

  export type UserWindowUpdateWithWhereUniqueWithoutUserInput = {
    where: UserWindowWhereUniqueInput
    data: XOR<UserWindowUpdateWithoutUserInput, UserWindowUncheckedUpdateWithoutUserInput>
  }

  export type UserWindowUpdateManyWithWhereWithoutUserInput = {
    where: UserWindowScalarWhereInput
    data: XOR<UserWindowUpdateManyMutationInput, UserWindowUncheckedUpdateManyWithoutUserInput>
  }

  export type UserWindowScalarWhereInput = {
    AND?: UserWindowScalarWhereInput | UserWindowScalarWhereInput[]
    OR?: UserWindowScalarWhereInput[]
    NOT?: UserWindowScalarWhereInput | UserWindowScalarWhereInput[]
    id?: IntFilter<"UserWindow"> | number
    userId?: IntFilter<"UserWindow"> | number
    windowId?: IntFilter<"UserWindow"> | number
    isActive?: BoolFilter<"UserWindow"> | boolean
    createdAt?: DateTimeFilter<"UserWindow"> | Date | string
    updatedAt?: DateTimeFilter<"UserWindow"> | Date | string
  }

  export type WindowCreateWithoutQueuesInput = {
    windowTitle: string
    windowDescription: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    userWindows?: UserWindowCreateNestedManyWithoutWindowInput
  }

  export type WindowUncheckedCreateWithoutQueuesInput = {
    id?: number
    windowTitle: string
    windowDescription: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    userWindows?: UserWindowUncheckedCreateNestedManyWithoutWindowInput
  }

  export type WindowCreateOrConnectWithoutQueuesInput = {
    where: WindowWhereUniqueInput
    create: XOR<WindowCreateWithoutQueuesInput, WindowUncheckedCreateWithoutQueuesInput>
  }

  export type WindowUpsertWithoutQueuesInput = {
    update: XOR<WindowUpdateWithoutQueuesInput, WindowUncheckedUpdateWithoutQueuesInput>
    create: XOR<WindowCreateWithoutQueuesInput, WindowUncheckedCreateWithoutQueuesInput>
    where?: WindowWhereInput
  }

  export type WindowUpdateToOneWithWhereWithoutQueuesInput = {
    where?: WindowWhereInput
    data: XOR<WindowUpdateWithoutQueuesInput, WindowUncheckedUpdateWithoutQueuesInput>
  }

  export type WindowUpdateWithoutQueuesInput = {
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userWindows?: UserWindowUpdateManyWithoutWindowNestedInput
  }

  export type WindowUncheckedUpdateWithoutQueuesInput = {
    id?: IntFieldUpdateOperationsInput | number
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userWindows?: UserWindowUncheckedUpdateManyWithoutWindowNestedInput
  }

  export type QueueCreateWithoutWindowInput = {
    studentId: string
    firstName: string
    lastName: string
    ticketNumber: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type QueueUncheckedCreateWithoutWindowInput = {
    id?: number
    studentId: string
    firstName: string
    lastName: string
    ticketNumber: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type QueueCreateOrConnectWithoutWindowInput = {
    where: QueueWhereUniqueInput
    create: XOR<QueueCreateWithoutWindowInput, QueueUncheckedCreateWithoutWindowInput>
  }

  export type QueueCreateManyWindowInputEnvelope = {
    data: QueueCreateManyWindowInput | QueueCreateManyWindowInput[]
  }

  export type UserWindowCreateWithoutWindowInput = {
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserWindowsInput
  }

  export type UserWindowUncheckedCreateWithoutWindowInput = {
    id?: number
    userId: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWindowCreateOrConnectWithoutWindowInput = {
    where: UserWindowWhereUniqueInput
    create: XOR<UserWindowCreateWithoutWindowInput, UserWindowUncheckedCreateWithoutWindowInput>
  }

  export type UserWindowCreateManyWindowInputEnvelope = {
    data: UserWindowCreateManyWindowInput | UserWindowCreateManyWindowInput[]
  }

  export type QueueUpsertWithWhereUniqueWithoutWindowInput = {
    where: QueueWhereUniqueInput
    update: XOR<QueueUpdateWithoutWindowInput, QueueUncheckedUpdateWithoutWindowInput>
    create: XOR<QueueCreateWithoutWindowInput, QueueUncheckedCreateWithoutWindowInput>
  }

  export type QueueUpdateWithWhereUniqueWithoutWindowInput = {
    where: QueueWhereUniqueInput
    data: XOR<QueueUpdateWithoutWindowInput, QueueUncheckedUpdateWithoutWindowInput>
  }

  export type QueueUpdateManyWithWhereWithoutWindowInput = {
    where: QueueScalarWhereInput
    data: XOR<QueueUpdateManyMutationInput, QueueUncheckedUpdateManyWithoutWindowInput>
  }

  export type QueueScalarWhereInput = {
    AND?: QueueScalarWhereInput | QueueScalarWhereInput[]
    OR?: QueueScalarWhereInput[]
    NOT?: QueueScalarWhereInput | QueueScalarWhereInput[]
    id?: IntFilter<"Queue"> | number
    studentId?: StringFilter<"Queue"> | string
    firstName?: StringFilter<"Queue"> | string
    lastName?: StringFilter<"Queue"> | string
    ticketNumber?: IntFilter<"Queue"> | number
    status?: StringFilter<"Queue"> | string
    createdAt?: DateTimeFilter<"Queue"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Queue"> | Date | string | null
    windowId?: IntNullableFilter<"Queue"> | number | null
  }

  export type UserWindowUpsertWithWhereUniqueWithoutWindowInput = {
    where: UserWindowWhereUniqueInput
    update: XOR<UserWindowUpdateWithoutWindowInput, UserWindowUncheckedUpdateWithoutWindowInput>
    create: XOR<UserWindowCreateWithoutWindowInput, UserWindowUncheckedCreateWithoutWindowInput>
  }

  export type UserWindowUpdateWithWhereUniqueWithoutWindowInput = {
    where: UserWindowWhereUniqueInput
    data: XOR<UserWindowUpdateWithoutWindowInput, UserWindowUncheckedUpdateWithoutWindowInput>
  }

  export type UserWindowUpdateManyWithWhereWithoutWindowInput = {
    where: UserWindowScalarWhereInput
    data: XOR<UserWindowUpdateManyMutationInput, UserWindowUncheckedUpdateManyWithoutWindowInput>
  }

  export type UserCreateWithoutUserWindowsInput = {
    email: string
    username: string
    password: string
    fullName: string
    nickname: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUncheckedCreateWithoutUserWindowsInput = {
    id?: number
    email: string
    username: string
    password: string
    fullName: string
    nickname: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserCreateOrConnectWithoutUserWindowsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserWindowsInput, UserUncheckedCreateWithoutUserWindowsInput>
  }

  export type WindowCreateWithoutUserWindowsInput = {
    windowTitle: string
    windowDescription: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    queues?: QueueCreateNestedManyWithoutWindowInput
  }

  export type WindowUncheckedCreateWithoutUserWindowsInput = {
    id?: number
    windowTitle: string
    windowDescription: string
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    queues?: QueueUncheckedCreateNestedManyWithoutWindowInput
  }

  export type WindowCreateOrConnectWithoutUserWindowsInput = {
    where: WindowWhereUniqueInput
    create: XOR<WindowCreateWithoutUserWindowsInput, WindowUncheckedCreateWithoutUserWindowsInput>
  }

  export type UserUpsertWithoutUserWindowsInput = {
    update: XOR<UserUpdateWithoutUserWindowsInput, UserUncheckedUpdateWithoutUserWindowsInput>
    create: XOR<UserCreateWithoutUserWindowsInput, UserUncheckedCreateWithoutUserWindowsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserWindowsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserWindowsInput, UserUncheckedUpdateWithoutUserWindowsInput>
  }

  export type UserUpdateWithoutUserWindowsInput = {
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutUserWindowsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WindowUpsertWithoutUserWindowsInput = {
    update: XOR<WindowUpdateWithoutUserWindowsInput, WindowUncheckedUpdateWithoutUserWindowsInput>
    create: XOR<WindowCreateWithoutUserWindowsInput, WindowUncheckedCreateWithoutUserWindowsInput>
    where?: WindowWhereInput
  }

  export type WindowUpdateToOneWithWhereWithoutUserWindowsInput = {
    where?: WindowWhereInput
    data: XOR<WindowUpdateWithoutUserWindowsInput, WindowUncheckedUpdateWithoutUserWindowsInput>
  }

  export type WindowUpdateWithoutUserWindowsInput = {
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queues?: QueueUpdateManyWithoutWindowNestedInput
  }

  export type WindowUncheckedUpdateWithoutUserWindowsInput = {
    id?: IntFieldUpdateOperationsInput | number
    windowTitle?: StringFieldUpdateOperationsInput | string
    windowDescription?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    queues?: QueueUncheckedUpdateManyWithoutWindowNestedInput
  }

  export type UserWindowCreateManyUserInput = {
    id?: number
    windowId: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserWindowUpdateWithoutUserInput = {
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    window?: WindowUpdateOneRequiredWithoutUserWindowsNestedInput
  }

  export type UserWindowUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    windowId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWindowUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    windowId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QueueCreateManyWindowInput = {
    id?: number
    studentId: string
    firstName: string
    lastName: string
    ticketNumber: number
    status?: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserWindowCreateManyWindowInput = {
    id?: number
    userId: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QueueUpdateWithoutWindowInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    ticketNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueUncheckedUpdateWithoutWindowInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    ticketNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QueueUncheckedUpdateManyWithoutWindowInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    ticketNumber?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserWindowUpdateWithoutWindowInput = {
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserWindowsNestedInput
  }

  export type UserWindowUncheckedUpdateWithoutWindowInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserWindowUncheckedUpdateManyWithoutWindowInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}