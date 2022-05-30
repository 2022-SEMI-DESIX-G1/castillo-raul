const generateFibonacci = (length, array = [0, 1]) => {
    let numberOne, numberTwo;

    for (let i = array.length; i < length; i++) {
        numberOne = array[i - 1];
        numberTwo = array[i - 2];
        array.push(numberOne + numberTwo);
    }

    return array;
};

let length = 5;

console.log(generateFibonacci(length));