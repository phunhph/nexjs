//Generic Function
import _ from "lodash";
// Function to check if a value is an array and log a message
const checkArray = <T>(value: T | T[]): void => {
  if (Array.isArray(value)) {
    console.log("The value is an array:", value);
  } else {
    console.log("The value is not an array:", value);
  }
};
// sum
const sumBy = <T>(items: Array<T>, key: keyof T): number => {
  return items.reduce((acc, crr) => {
    if (typeof crr[key] === "number") {
      return acc + crr[key];
    }
    return acc;
  }, 0);
};

const tich = <T>(items: Array<T>, key: keyof T): number => {
  return items.reduce((acc, crr) => {
    if (typeof crr[key] === "number") {
      return acc * crr[key];
    }
    return acc;
  }, 1);
};

const data_abs = <T>(items: Array<T>, key: keyof T): number[] => {
  return items.map((item) => Math.abs(Number(item[key])));
};

const data_max_min = <T>(
  items: Array<T>,
  key: keyof T
): { max: number; min: number } => {
  const arr = items.map((item) => Number(item[key]));

  if (arr.length === 0) {
    return { max: -Infinity, min: Infinity };
  }

  const max = Math.max(...arr);
  const min = Math.min(...arr);

  return { max, min };
};

const data_chunk = <T>(items: Array<T>): T[][] => {
  const chunks = _.chunk(items, 4);
  return chunks;
};

const data_compact = <T>(items: Array<T>): T[] => {
  return _.compact(items);
};

const data_concat = <T>(items1: Array<T>, items2: Array<T>): T[] => {
  return _.concat(data_compact(items1), data_compact(items2));
};

const data_difference = <T>(items1: Array<T>, items2: Array<T>) => {
  return _.difference(items1, items2);
};

const data_differenceBy = <T>(
  items1: Array<T>,
  items2: Array<T>,
  key: keyof T
) => {
  return _.differenceBy(items1, items2, key);
};

const data_fill = <T>(items1: Array<T>, value: T): T[] => {
  let fill = _.fill(items1, value);
  return fill;
};

const data_filter = <T>(items: Array<T>, criteria: Partial<T>): T[] => {
  let filters = _.filter(items, criteria) as T[];
  return filters;
};

interface User {
  user: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
  { user: "pebbles", age: 1, active: true },
];

const sortBy = <T extends Record<string, any>>(
  arr: T[],
  field: keyof T
): T[] => {
  return arr.slice().sort((a, b) => {
    const aField = a[field] ?? 0;
    const bField = b[field] ?? 0;

    if (typeof aField === "string" && typeof bField === "string") {
      return aField.localeCompare(bField);
    } else {
      return (aField as unknown as number) - (bField as unknown as number);
    }
  });
};

const data_unzip = <T>(items: Array<T>): T[][] => {
  return _.unzip(items as T[][]);
};

const data_flow = (item1: number): number => {
  const add = (x: number) => x + 1;
  const multiply = (x: number) => x * 2;

  const pipeline = _.flow([add, multiply]);

  return pipeline(item1);
};

const data_clone = <T>(items: T): T => {
  return _.cloneDeep(items);
};

const data_Equal = <T>(item_1: T, item_2: T): boolean => {
  return _.isEqual(item_1, item_2);
};

const check_Empty = <T>(items: T): boolean => {
  return _.isEmpty(items);
};

const check_Nil = <T>(items: T) => {
  if (_.isEmpty(items)) {
    console.log("Không tồn tại dữ liệu ");
  }
  if (_.isNil(items)) {
    console.log("Không null hoặc undefined ");
  }
  if (_.isNumber(items)) {
    console.log("Dữ liệu kiểu số");
  }
  if (_.isString(items)) {
    console.log("Dữ liệu kiểu chuỗi");
  }
};
interface Users {
  name: string;
  age: number;
}

const map_data = <T extends Users>(items: T[]): number[] => {
  return items.map((item) => item.age);
};



const obj1: Users[] = [
  {
    name: "John",
    age: 18,
  },
  {
    name: "John",
    age: 28,
  },
  {
    name: "John",
    age: 38,
  },
];

console.log(map_data(obj1));

const data = [{ value: 10 }, { value: 20 }, { value: 30 }];
const data_lodash_differenceBy = [{ value: 10 }];
const data_lodash_chunk = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const zipped: [string[], number[], boolean[]] = [
  ["a", "b", "c"],
  [1, 2, 3],
  [true, false, true],
];

const data_lodash_compact = [
  1,
  2,
  3,
  4,
  "",
  null,
  undefined,
  true,
  false,
  5,
  6,
  7,
  8,
  9,
  10,
];

const data_lodash_clone = { name: "John", details: { age: 30 } };

const obj2 = { name: "John", age: 10 };
