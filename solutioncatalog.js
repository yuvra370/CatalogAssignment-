const readline = require('readline');

// Lagrange interpolation function
function lagrangeInterpolation(points, xValue) {
    let result = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (xValue - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }
    return result;
}

// Function to decode y values based on the given base
function decodeBaseValue(base, value) {
    return parseInt(value, base);
}

// Main function to process the input and find the constant term 'c'
function findConstantTerm(testCase) {
    const points = [];

    // Decode the points
    for (let key in testCase) {
        if (key !== 'keys') {
            const x = parseInt(key); // x is the key of the object
            const base = parseInt(testCase[key].base); // Base of the value
            const yEncoded = testCase[key].value; // Encoded y value
            const y = decodeBaseValue(base, yEncoded); // Decode y based on the base
            points.push({ x, y });
        }
    }

    const constantTerm = lagrangeInterpolation(points, 0); // Solve for f(0) (the constant term)
    return constantTerm;
}

// Example input test case in JSON format
const testCase = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
    
};

// Find the constant term
const constantTerm = findConstantTerm(testCase);
console.log('The constant term (c) is:', constantTerm);

