const ONES = [
    "", "one", "two", "three", "four", "five", 
    "six", "seven", "eight", "nine"
];
const TEENS = [
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", 
    "sixteen", "seventeen", "eighteen", "nineteen"
];
const TENS = [
    "", "", "twenty", "thirty", "forty", "fifty", 
    "sixty", "seventy", "eighty", "ninety"
];

function numToWords(num) {
    if (!isValidNumber(num)) throw new Error(
        "Invalid input: Please provide a number between -999,999,999 and 999,999,999. " +
        "Strings, null, undefined, and values outside this range are not supported."
    );
    if (num === 0) return "Zero";

    const absNum = Math.abs(num).toString().padStart(9, "0"); // Ensure 9-digit padding
    const parts = [
        absNum.slice(0, 2), // Crore
        absNum.slice(2, 4), // Lakh
        absNum.slice(4, 6), // Thousand
        absNum[6],          // Hundreds
        absNum.slice(7)     // Last two digits
    ];

    let result = "";
    const unitLabels = ["crore", "lakh", "thousand", "hundred", ""]; // Match parts order

    parts.forEach((chunk, index) => {
        const value = Number(chunk);
        if (value > 0) {
            result += convertChunk(chunk) + (unitLabels[index] ? ` ${unitLabels[index]} ` : "");
            if (index === 3 && parts[4] !== "00") result += "and "; // Add "and" after hundreds
        }
    });

    return (num < 0 ? "Minus " : "") + result.trim();
}

function isValidNumber(num) {
    return typeof num === "number" && !isNaN(num) && num >= -999_999_999 && num <= 999_999_999;
}

function convertChunk(chunk) {
    const num = Number(chunk);
    if (num === 0) return "";

    if (num < 10) return ONES[num];
    if (num < 20) return TEENS[num - 10];
    return TENS[Math.floor(num / 10)] + " " + ONES[num % 10];
}

module.exports = numToWords;
