# Everyday Types

## The primitives

###### String

```ts
const string1: string = 'hello';
```

###### Number

```ts
const number1: number = 123;
```

###### Boolean

```ts
const boolean1: boolean = true;
```

###### void

```ts
function printResult(num: number): void {

  console.log('Result: ' + num);

}
```

###### symbol

There is a primitive in JavaScript used to create a globally unique reference via the function `Symbol()`:

```ts
const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {
This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Can't ever happen
}
```

##### Null & Undefined

TypeScript has two corresponding *types* by the same names. How these types behave depends on whether you have the [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) option on.

###### `strictNullChecks` off

With [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) *off*, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type. This is similar to how languages without null checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; we always recommend people turn [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) on if it’s practical to do so in their codebase.

###### `strictNullChecks` on

With [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks) *on*, when a value is `null` or `undefined`, you will need to test for those values before using methods or properties on that value. Just like checking for `undefined` before using an optional property, we can use *narrowing* to check for values that might be `null`:

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

----

## Object Types

##### Arrays

```ts
let favoriteActivities1: string[];
let favoriteActivities2: number[];
let carsByMake: string[][];

const carsByMake = [
    ['f150'],
    ['corolla'],
    ['camaro'],
]
```

##### Functions

TypeScript allows you to specify the types of both the input and output values of functions.

###### Parameter Type Annotations

you can add type annotations after each parameter to declare what types of parameters the function accepts.

```ts
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

###### Return Type Annotations

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its `return` statements. The type annotation in the above example doesn’t change anything.

###### Function Types Callback

```ts
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}
addAndHandle(10, 20, (result) => {
  console.log(result);
});
```

###### Anonymous Functions

When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types

```ts
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

##### Classes

##### Objects

```ts
const person: {
  name: string;
  age: number;
} = {
  name: 'bob',
  age: 30
};
```

###### Interfaces

An *interface declaration* is another way to name an object type:

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

it only cares that it has the expected properties. Being concerned only with the structure and capabilities of types is why we call TypeScript a *structurally typed* type system.

###### Destructuring with Annotations

```ts
const forecast = {
  date: new Date(),
  weather: 'sunny'
};
const logWeather = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

// es 2015
const logWeather = ({
  date,
  weather
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
```

###### Another destructuring

```ts
const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age;
  }
};

const { age, name }: { age: number; name: string } = profile;
const {
  coords: { lat, lng }
}: { coords: { lat: number; lng: number } } = profile;
```

---

## Any other types

##### Any

any kind of value, no specific assignment

 you can access any properties of it (which will in turn be of type `any`), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:

```ts
const anything: any[] = ['sports', 123];
```

> noImplicitAny
> 
> When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`.
> 
> You usually want to avoid this, though, because `any` isn’t type-checked. Use the compiler flag [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) to flag any implicit `any` as an error.

##### Unknown Type

```ts
let userInput: unknown;
userInput = 5;
userInput = 'Max';

different with any
let userInput: unknown;
let userInput: any;
let userName: string;
userInput = 5;
userInput = 'Max';
userName = userInput;
one way to work around
if (typeof userInput === 'string') {
  userName = userInput;
}
```

##### Never Type

Never produces a result

```ts
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}
generateError('An error occured!', 500);
```

##### Type Aliases

We’ve been using object types and union types by writing them directly in type annotations. This is convenient, but it’s common to want to use the same type more than once and refer to it by a single name.

```ts
type Combinable = number | string;
const typeAlias: Combinable = 'str';
```

##### Tuples

fixed length array & represent some property of record

```ts
let role: [number, string] = [2, 'author'];

const pepsi: [string,boolean,number] = ['brown', true, 40];
type Drink = [string, boolean, number]
const pepsi: Drink = ['brown', true, 40];
```

##### Enum

assign label to numbers

```ts
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}

enum Role2 {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR'
}
```

##### Literal types

One way to think about this is to consider how JavaScript comes with different ways to declare a variable. Both `var` and `let` allow for changing what is held inside the variable, and `const` does not. This is reflected in how TypeScript creates types for literals.

```ts
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text'
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}
const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
```

##### Optional Properties

Object types can also specify that some or all of their properties are *optional*. To do this, add a `?` after the property name:

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

##### Type Assertions

Sometimes you will have information about the type of a value that TypeScript can’t know about.

For example, if you’re using `document.getElementById`, TypeScript only knows that this will return *some* kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID.

In this situation, you can use a *type assertion* to specify a more specific type:

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;=
```

###### Literal Inference

When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later. For example, if you wrote code like this:

```ts
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript doesn’t assume the assignment of `1` to a field which previously had `0` is an error. Another way of saying this is that `obj.counter` must have the type `number`, not `0`, because types are used to determine both *reading* and *writing* behavior.

```ts
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

In the above example `req.method` is inferred to be `string`, not `"GET"`. Because code can be evaluated between the creation of `req` and the call of `handleRequest` which could assign a new string like `"GUESS"` to `req.method`, TypeScript considers this code to have an error.

There are two ways to work around this:

1. You can change the inference by adding a type assertion in either location:
   
   ```ts
   // Change 1:
   const req = { url: "https://example.com", method: "GET" as "GET" };
   // Change 2
   handleRequest(req.url, req.method as "GET");
   ```

2. You can use `as const` to convert the entire object to be type literals:
   
   ```ts
   const req = { url: "https://example.com", method: "GET" } as const;
   handleRequest(req.url, req.method);
   ```
   
   The `as const` suffix acts like `const` but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like `string` or `number`.

## Union

it’s time to start *combining* them in interesting ways.

 A union type is a type formed from two or more other types, representing values that may be *any one* of those types.

```ts
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });mbinedNames);
```

###### Working with Union Types

If you *have* a value of a union type, how do you work with it?

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
Property 'toUpperCase' does not exist on type 'string | number'.
  Property 'toUpperCase' does not exist on type 'number'.
}
```

The solution is to *narrow* the union with code, the same as you would in JavaScript without type annotations. *Narrowing* occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
another eg:
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a `slice` method.

```ts
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

## Type Annotation

###### Type Annotations on Variables

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly specify the type of the variable:

```ts
let myName: string = "Alice";
```

In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically *infer* the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

```ts
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

For the most part you don’t need to explicitly learn the rules of inference. If you’re starting out, try using fewer type annotations than you think - you might be surprised how few you need for TypeScript to fully understand what’s going on.
