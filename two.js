// Do not modify this mock API
const mockGeocodeAPI = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Mapped_${id}`), 50);
  });
};

// A large array of 10,000 events
const incomingEvents = Array.from({ length: 10000 }, (_, i) => ({ id: `car_${i}` }));

// Your function
const processInBatches = async (events, batchSize) => {
  const allResults = [];

  // 1. The standard 'for' loop stepping by your batchSize
  for (let i = 0; i < events.length; i += batchSize) {
    
    // 2. Extract the chunk non-destructively using slice
    const chunk = events.slice(i, i + batchSize);
    
    // 3. Map only this small chunk to promises
    const chunkPromises = chunk.map(ev => mockGeocodeAPI(ev.id));
    
    // 4. Await the chunk. 
    // CRITICAL: Because this is a standard 'for' loop, the loop actually PAUSES here 
    // until the 100 promises finish. It acts as a perfect rate limiter.
    const chunkResults = await Promise.all(chunkPromises);
    
    // 5. Push the results into our master array (using spread to avoid nested arrays)
    allResults.push(...chunkResults);
  }

  return allResults;
};

// Execution expected to run without crashing the heap or triggering 429s:
const results = await processInBatches(incomingEvents, 100);
console.log(results)