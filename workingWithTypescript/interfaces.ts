//
//
//
// Interfaces ===> Create a new type, describing the property names and value types of an object

const oldCivic = {
  name: "civic",
  year: 2000,
  broken: true,
};
// ------------------------------------------------------------------------------------

interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

const printVehicle = (vehicle: { name: string; year: number; broken: boolean }): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
};

printVehicle(oldCivic);
// The annotation is very long and not reusable.
// So we'll use an interface.
// ------------------------------------------------------------------------------------

interface Vehicle_2 {
  name: string;
  year: number;
  broken: boolean;
}

// to call this fucntion, you must provide an object that meets the specifications provided by the Vehicle interface
const printVehicle_2 = (vehicle: Vehicle_2): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
};

printVehicle_2(oldCivic);
// ------------------------------------------------------------------------------------
// The interface can have many types
interface Vehicle_3 {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string; // a function with no arguments that returns a string
}
const printVehicle_3 = (vehicle: Vehicle_3): void => {
  console.log(vehicle.summary());
};

const car = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

printVehicle_3(car);

// The problme with this is that if we were to delete the name, year, broken from
// the Vehicle_3 interface, the printVehicle_3 function would still work.
// That's because when we pass in the "car" object, TypeScript will ask => does this object here satisfy the "Vehicle_3" interface?
// So if the vehicle interface only had the "summary(): string" method, the car object would still satisfy the interface.
// Typescript would ask, does the car object have a "summary" method that returns a string?
// If yes, then the car object satisfies the Vehicle_3 interface. That's it. It doesn't ask anything else.
// It doesn't matter if the car has additional properties that are not part of the interface.
// Because that's the only question that it asks, it doesn't ask if there are any extra properties on the object that are not part of the interface.
// ------------------------------------------------------------------------------------

interface Reportable {
  summary(): string;
}
const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

const bevarage = {
  color: "brown",
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My bevarage has ${this.sugar} grams of sugar`;
  },
};
const anotherCar = {
  name: "civic",
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  },
};

// Because both objects have a "summary" method that returns a string, they both satisfy the "Reportable" interface
// Eventhough they are completely different objects.

printSummary(bevarage);
printSummary(anotherCar);

// ==> We can use a single interface to describe the shape or different properties of completely different objects.

// Always try to define interfaces for each argument that you pass into a function.
// ------------------------------------------------------------------------------------