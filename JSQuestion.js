const addNumbers = (num1, num2) => {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('Both inputs must be valid numbers.');
    }
  
    const result = num1 + num2;
    return result;
}

const sum = addNumbers(1, 2);
console.log(`Sum of two numbers are ${sum}`);
