//
//
//
// take in two arguments as numbers and return a number
const add = (a: number, b: number): number => {
  return a + b;
};
// ALWAYS ANNOTATE RETURN TYPE OF A FUNCTION, as well as the arguments

// a function that won't return anything
const logger = (message: string): void => {
  console.log(message);
};

// ------------------------------------------------------
const forecast = {
  date: new Date(),
  weather: "sunny",
};
const logWeather = ({ date, weather }: { date: Date; weather: string }): void => {
  console.log(date);
  console.log(weather);
};

// ------------------------------------------------------
// we are never goign ot execute the fucntion completely
// at some point inside of here, we are going to throw an error
// and aexot the function early without returning any value
const throwError = (message: string): never => {
  throw new Error(message);
};
// ==> rarely used, mostly we would do this

const thingy = (message: string): string => {
  if (!message) {
    throw new Error(message);
  }
  return message;
};
