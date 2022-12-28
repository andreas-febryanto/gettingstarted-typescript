# Narrowing

Imagine we have a function called `padLeft.`

```ts
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}
```

Uh-oh, we’re getting an error on `padding`. TypeScript is warning us that adding a `number | string` to a `number` might not give us what we want, and it’s right. In other words, we haven’t explicitly checked if `padding` is a `number` first, nor are we handling the case where it’s a `string`, so let’s do exactly that.

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

If this mostly looks like uninteresting JavaScript code, that’s sort of the point. Apart from the annotations we put in place, this TypeScript code looks like JavaScript. The idea is that TypeScript’s type system aims to make it as easy as possible to write typical JavaScript code without bending over backwards to get type safety. It looks at these special checks (called *type guards*) and assignments, and the process of refining types to more specific types than declared is called *narrowing*.



## Types of Type Guards

As we’ve seen, JavaScript supports a `typeof` operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:

- "string"

- "number"

- "bigint"

- "boolean"

- "symbol"

- "underfined"

- "object"

- "function"

## Truthiness Narrowing

## Equality Narrowing

## The in Operator Narrowing

## Instanceof Narrowing

## Assignments

## Control Flow Analysis

## Using Type Predicates

## Discriminated Unions

## The Never Type

## Exhaustiveness Checking
