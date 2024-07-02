//
//
//

const profile = {
  name: "alex",
  age: 20,
  coords: {
    lat: 0,
    lng: 15,
  },
  setAge(age: number): void {
    this.age = age;
  },
};

const GET_age = ({ age }: { age: number }): number => {
  return age + 2;
};

// here we expect the "profle" object to have property "age" of type number
// this is a destructuring of the object
const { age }: { age: number } = profile;

const {
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;
