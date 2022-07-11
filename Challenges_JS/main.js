function showNums() {
  const nums = Array.from(arguments);
  const newNums = nums.slice(0, nums.length - 2);
  const multBy = nums[nums.length - 2];
  const numberOfPair = nums[nums.length - 1];
  console.log(newNums);

  let pairs = [];
  for (let i = 1; i <= numberOfPair; i++) {
    const pair = `${i}ª pareja ${nums[i - 1] * multBy} - ${nums[i] * multBy}`;
    pairs.push(pair);
  }
  pairs.forEach((e) => console.log(e));
}
fibo = (pos) => {
  const fibonaci = [];
  fibonaci[0] = 0;
  fibonaci[1] = 1;
  for (let i = 2; i < pos; i++) {
    const number = fibonaci[i - 2] + fibonaci[i - 1];
    fibonaci.push(number);
  }
  console.log(fibonaci);
};
showPiramide = (height) => {};

//showNums(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 3);
fibo(15);
