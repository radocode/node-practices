const vehicleSpeeds = [60, 65, 55, 60, 70, 65];
const k = 3;

// Expected Output: [60, 60, 61.66, 65]
// (Window 1: 60+65+55 / 3 = 60)
// (Window 2: 65+55+60 / 3 = 60)
// (Window 3: 55+60+70 / 3 = 61.66)

/* 
The Requirements

Write a function calculateMovingAverage(speeds, k) that takes an array of numbers (speeds) and an integer (k representing the window size).

    It must calculate the average of every contiguous sub-array of length k.

    It must return a new array of these averages.

    The Constraint: Your solution must be O(N) time complexity. You cannot use nested loops.
*/

calculateMovingAverage = (speeds, k) => {
    const averages = [];
    let windowSum = 0;
    let windowStart = 0;
    
    for (let windowEnd = 0; windowEnd < speeds.length; windowEnd++) {
        windowSum += speeds[windowEnd]; // Add the next element to the window

        // Slide the window, we don't need to slide if we've not hit the window size of k yet
        if (windowEnd >= k - 1) {
            const average = Number((windowSum / k).toFixed(2));
            averages.push(average);
            windowSum -= speeds[windowStart]; // Subtract the element going out of the window
            windowStart++; // Slide the window ahead
        }
    }
    
    return averages;
}

console.log(calculateMovingAverage(vehicleSpeeds, k)); // Call the function with the provided speeds and window size