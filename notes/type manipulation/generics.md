# Generics

In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is *generics*, that is, being able to create a component that can work over a variety of types rather than a single one. This allows users to consume these components and use their own types.

## Helo World of Generics

The identity function is a function that will return back whatever is passed in. You can think of this in a similar way to the `echo` command.

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

We say that this version of the `identity` function is generic, as it works over a range of types. Unlike using `any`, it’s also just as precise (i.e., it doesn’t lose any information) as the first `identity` function that used numbers for the argument and return type.

we can call it in one of two ways:

```ts
let output = identity<string>("myString");
let output = identity("myString");
```

## Working with Generic Type Variables

When you begin to use generics, you’ll notice that when you create generic functions like `identity`, the compiler will enforce that you use any generically typed parameters in the body of the function correctly. That is, that you actually treat these parameters as if they could be any and all types.

```ts
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

## Generic Types

The type of generic functions is just like those of non-generic functions, with the type parameters listed first, similarly to function declarations:

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

We can also write the generic type as a call signature of an object literal type:

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;

// which leads us to writing our generic interface
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

## Generic Classes

A generic class has a similar shape to a generic interface. Generic classes have a generic type parameter list in angle brackets (`<>`) following the name of the class.

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

## Generic Constraints

To do so, we’ll create an interface that describes our constraint. Here, we’ll create an interface that has a single `.length` property and then we’ll use this interface and the `extends` keyword to denote our constraint:

```ts
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// Because the generic function is now constrained, it will no longer work over any and all types:
loggingIdentity(3);
// instead
loggingIdentity({ length: 10, value: 3 });
```

## Using Type Parameters in Generic Constraints

You can declare a type parameter that is constrained by another type parameter

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");
```

## Using Class Types in Generics

When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions.

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

more ex:

```ts
class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal {
  numLegs: number = 4;
}
 
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```
