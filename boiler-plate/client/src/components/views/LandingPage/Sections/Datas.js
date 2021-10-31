const continents = [
  {
    _id: 1,
    name: "Africa"
  },
  {
    _id: 2,
    name: "Europe"
  },
  {
    _id: 3,
    name: "Asia"
  },
  {
    _id: 4,
    name: "North America"
  },
  {
    _id: 5,
    name: "South America"
  },
  {
    _id: 6,
    name: "Austraila"
  }
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: []
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199]
  },
  {
    _id: 2,
    name: "$200 to $399",
    array: [200, 399]
  },
  {
    _id: 3,
    name: "more than $400",
    array: [400, 9999999]
  }
];

export { continents, price };
