//
//
//

let apples: number = 5; // Can only be a number
let speed: string = "fast"; // Can only be a string
let hasName: boolean = true; // Can only be a boolean

let nothingMuch: null = null; // Can only be null
let nothing: undefined = undefined; // Can only be undefined

let now: Date = new Date(); // Can only be a Date object

// Array
let colors: string[] = ["red", "green", "blue"]; // An array of only strings
let myNumbers: number[] = [1, 2, 3]; // An array of only numbers
let truths: boolean[] = [true, true, false]; // An array of only booleans

// Classes
class Car {}
let car: Car = new Car(); // Can only be an instance of Car

// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

// Function
// ...(i: number) => void... is the annotation for a function that takes in a number and returns nothing
// here we are annotating a varaible declaration (the "logNumber", not the function itself)
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// When to use annotations
// 1) Function that returns the 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates = JSON.parse(json); // JSON.parse returns 'any' type
const coordinates2: { x: number; y: number } = JSON.parse(json); // This is better
// ------------------------------------------------------------------------------------------------------------------------

// 2) When we declare a variable on one line and initialize it later
let words = ["red", "green", "blue"];
let foundWord; // This is bad
let foundWord_2: boolean; // This is better OR ==> let foundWord = false;

for (let i = 0; i < words.length; i++) {
  if (words[i] === "green") {
    foundWord = true;
  }
}
// ------------------------------------------------------------------------------------------------------------------------

// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
let numberAboveZero = false; // This is bad
let numberAboveZero_2: boolean | number = false; // This is better

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
