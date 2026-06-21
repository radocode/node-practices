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
   // Write your chunking logic here
};

// Execution expected to run without crashing the heap or triggering 429s:
const results = await processInBatches(incomingEvents, 100);