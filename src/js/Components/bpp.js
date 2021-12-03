import "../../scss/test.scss";

const array = [1, 2, 3, 4, 5];
const f = (arr) => {
  const reduce = 0;
  for (let i = 0; i < arr.length; i++) {
    reduce += arr[i];
  }

  return reduce;
};

console.log(f(array));
