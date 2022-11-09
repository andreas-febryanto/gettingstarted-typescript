import { NumbersCollection } from './NumbersCollections';

// interface Sortable {
//   length: number;
//   compare(leftIndex: number, rightIndex: number): boolean;
//   swap(leftIndex: number, rightIndex: number): void;
// }

export abstract class Sorter {
  // constructor(public collection: Sortable) {}
  // constructor(public collection: NumbersCollection) {}
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  abstract length: number;

  sort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}

// // BAD IMPLEMENTATION
// class Sorter {
//   constructor(public collection: number[] | string) {}

//   sort(): void {
//     const { length } = this.collection;

//     for (let i = 0; i < length; i++) {
//       for (let j = 0; j < length - i - 1; j++) {

//         // If collection is an array of numbers
//         if(this.collection instanceof Array) { //type guards
//           if (this.collection[j] > this.collection[j + 1]) {
//             const leftHand = this.collection[j];
//             this.collection[j] = this.collection[j + 1];
//             this.collection[j + 1] = leftHand;
//           }
//         }

//         // If collection is a string, do this logic instead:
//         if(typeof this.collection === 'string') {

//         }
//         //typeof -> Narrow type of a value to a primitive type (number, string, boolean, symbol)
//         // instanceof -> Narrow down every other type of value(every other value that is created with a constructor function)
//     }
//   }
// }

// const sorter = new Sorter([10, 3, -5, 0]);
// sorter.sort();
// console.log(sorter.collection);
