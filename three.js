import { EventEmitter } from 'events';

// Do not modify this mock stream generator
const generateMockStream = () => {
  const stream = new EventEmitter();
  setTimeout(() => {
    stream.emit('data', { id: "car_101", temp: 90 });
    stream.emit('data', { id: "car_102", temp: 85 });
    stream.emit('data', { id: "car_101", temp: 105 }); // New max for 101
    stream.emit('data', { id: "car_102", temp: 80 });
    stream.emit('end');
  }, 50);
  return stream;
};

const processDiagnostics = async (stream) => {
  // 1. The Tracker: Our O(1) memory-safe object
  const maxTemps = {};

  // 2. The Bridge: Wrapping the old-school stream in a modern Promise
  return new Promise((resolve, reject) => {
    
    // Listen for data arriving
    stream.on('data', (event) => {
      const { id, temp } = event;
      
      // If we haven't seen this car yet, OR this new temp is higher, update it.
      if (!maxTemps[id] || temp > maxTemps[id]) {
        maxTemps[id] = temp;
      }
    });

    // Listen for the stream finishing
    stream.on('end', () => {
      // The stream is done. We 'resolve' the promise and return our tracker object!
      resolve(maxTemps);
    });

    // Senior Developer Move: Always handle stream errors
    stream.on('error', (error) => {
      reject(error);
    });
    
  });
};

// Execution expected output: { car_101: 105, car_102: 85 }
const results = await processDiagnostics(generateMockStream());
console.log(results);