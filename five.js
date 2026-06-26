const rawLogs = [[1, 3], [8, 10], [2, 6], [15, 18]];


const mergeUptime = (intervals) => {
  // Edge case safety
  if (intervals.length === 0) return [];

  // Step 1: Sort the intervals by their start time
  // This turns [ [8, 10], [1, 3] ] into [ [1, 3], [8, 10] ]
  intervals.sort((a, b) => a[0] - b[0]);

  // Step 2: Put the very first interval into our final output array
  const merged = [intervals[0]];

  // Step 3: Loop through the rest of the sorted array
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    
    // Look at the last interval we pushed to our output array
    const lastMerged = merged[merged.length - 1];

    // OVERLAP CHECK: Does the current interval start BEFORE the last one ended?
    if (current[0] <= lastMerged[1]) {
      
      // They overlap! We merge them by extending the end time.
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
      
    } else {
      // No overlap! It's a clean break. Push it as a brand new block.
      merged.push(current);
    }
  }

  return merged;
};

console.log(mergeUptime(rawLogs));