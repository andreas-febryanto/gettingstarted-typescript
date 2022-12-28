# More on Functions

## Function Type Expressions

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```

## Call Signatures

In JavaScript, functions can have properties in addition to being callable. However, the function type expression syntax doesn’t allow for declaring properties. If we want to describe something callable with properties, we can write a *call signature* in an object type:

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

## Construct Signatures

JavaScript functions can also be invoked with the `new` operator. TypeScript refers to these as *constructors* because they usually create a new object. You can write a *construct signature* by adding the `new` keyword in front of a call signature:

```ts
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

## Generic Functions

In TypeScript, *generics* are used when we want to describe a correspondence between two values. We do this by declaring a *type parameter* in the function signature:

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

## Inference

Note that we didn’t have to specify `Type` in this sample. The type was *inferred* - chosen automatically - by TypeScript.

```ts
unction map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

## Constraints

We’ve written some generic functions that can work on *any* kind of value. Sometimes we want to relate two values, but can only operate on a certain subset of values. In this case, we can use a *constraint* to limit the kinds of types that a type parameter can accept.

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```

## Working with Constrained Value

Here’s a common error when working with generic constraints:

```ts
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
```

## Specifying Type Arguments

TypeScript can usually infer the intended type arguments in a generic call, but not always. For example, let’s say you wrote a function to combine two arrays:

```ts
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
// normally it would be an error to call this function with mismatched arrays
const arr = combine([1, 2, 3], ["hello"]);
// you could manually
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

## Guidelines for Writing Good Generic Functions

 Writing generic functions is fun, and it can be easy to get carried away with type parameters. Having too many type parameters or using constraints where they aren’t needed can make inference less successful, frustrating callers of your function.

### Push Type Parameters Down

```ts
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
 
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}
 
// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

### Use Fewer Type Parameters

```ts
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
 
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

### Type Parameters Should Appear Twice

```ts
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
 
greet("world");

// simpler version
function greet(s: string) {
  console.log("Hello, " + s);
}
```

## Optional Parameters

```ts
declare function f(x?: number): void;
// cut
// All OK
f();
f(10);
f(undefined);
```

## Optional Parameters in Callbacks

## Function Overloads

In TypeScript, we can specify a function that can be called in different ways by writing *overload signatures*. To do this, write some number of function signatures (usually two or more), followed by the body of the function:

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
```

## Overload Signatures and the Implementation Signature

## Writing Good Overloads

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

// much better 
function len(x: any[] | string) {
  return x.length;
}
// Callers can invoke this with either sort of value, and as an added bonus, we don't have to figure out a correct implemetation signature.
```

## Declaring this in a Function

```ts
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
 
const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

This pattern is common with callback-style APIs, where another object typically controls when your function is called. Note that you need to use `function` and not arrow functions to get this behavior:

## Other Types to Know About

## void

```ts
// The inferred return type is void
function noop() {
  return;
}
```

## object

The special type `object` refers to any value that isn’t a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, or `undefined`). This is different from the *empty object type* `{ }`, and also different from the global type `Object`. It’s very likely you will never use `Object`.

## unknown

```ts
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
}
```

## never

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

## Function

The global type `Function` describes properties like `bind`, `call`, `apply`, and others present on all function values in JavaScript. It also has the special property that values of type `Function` can always be called; these calls return `any`:

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

## Rest Parameters and Arguments

### Rest Parameters

In addition to using optional parameters or overloads to make functions that can accept a variety of fixed argument counts, we can also define functions that take an *unbounded* number of arguments using *rest parameters*.

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

### Rest Arguments

Conversely, we can *provide* a variable number of arguments from an array using the spread syntax. For example, the `push` method of arrays takes any number of arguments:

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

```

Note that in general, TypeScript does not assume that arrays are immutable. This can lead to some surprising behavior:

The best fix for this situation depends a bit on your code, but in general a `const` context is the most straightforward solution:

```ts
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

## Parameter Destructuring

You can use parameter destructuring to conveniently unpack objects provided as an argument into one or more local variables in the function body.

```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
// you can use named type
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## Assignability of Functions

### Return type void


