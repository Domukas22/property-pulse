//
//
//

const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40,
};

// An array that can have multiple types
const pepsi = ["brown", true, 40];
pepsi[0] = 40; // error, 40 is not a string. But it's not caught by TypeScript
pepsi[2] = "brown"; // error, "brown" is not a number. But it's not caught by TypeScript

// to make sure this doesn't happen, we'll create a tuple

const pepsi_2: [string, boolean, number] = ["brown", true, 40];
pepsi_2[0] = 40; // error, 40 is not a string. TypeScript catches this error
pepsi_2[2] = "brown"; // error, "brown" is not a number. TypeScript catches this error

// the problem now is, we have to keep repeating the same type annotation for every drink we create
// So let's create a type alias

type Drink = [string, boolean, number]; // this is creating the idea of a tuple
const coke: Drink = ["brown", true, 40];
const sprite: Drink = ["clear", true, 40];

// the problem with tuples is that they are not very descriptive
const carSpecs: [number, number] = [400, 3354]; // tuple
// what do these numbers represent? We don't know. So we'll use an object instead
const carStats = {
  horsepower: 400,
  weight: 3354,
}; // an objet model, which is more descriptive
// ===> don't really use tuples that much. They are not very descriptive. Use objects instead.
