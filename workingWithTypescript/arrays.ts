//
//
//

const carMakers = ["ford", "toyota", "chevy"]; // no need for annotation
const arrayOfStrings: string[] = []; // need to annotate

const dates = [new Date(), new Date()]; // no need for annotation
const arrayOfDates: Date[] = []; // need to annotate

const carsByMake = [["f150"], ["corolla"], ["camaro"]]; // no need for annotation ==> 2-dimensional array
const carsByMakeAnnotated: string[][] = []; // need to annotate

// Help with inference when extracting values
const car = carMakers[0]; // no need for annotation
const myCar = carMakers.pop(); // no need for annotation

// Prevent incompatible values
carMakers.push(100); // error. carMakers is an array of strings

// Help with 'map'
carMakers.map((car: string): string => {
  return car.toUpperCase();
});

// Flexible types
const importantDates: (Date | string)[] = [new Date(), "string"]; // an array of either dates or strings
importantDates.push("2030-10-10");
importantDates.push(new Date());
importantDates.push(100); // error. 100 is not a Date or a string
