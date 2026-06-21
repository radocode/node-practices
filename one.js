// Do not modify this mock function
const mockGeocodeAPI = async (id) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 100);
    setTimeout(() => {
      // Simulates a 20% failure rate
      if (Math.random() < 0.2) reject(new Error(`API Timeout for ${id}`));
      resolve({ id, location: "Mapped Street" });
    }, delay);
  });
};

const incomingEvents = [
  { id: "car_101", speed: 60 },
  { id: "car_102", speed: 45 },
  { id: "car_103", speed: 70 },
  { id: "car_104", speed: 55 }
];

const processTelemetryBatch = async (events) => {

  const promises = events.map((ev) => mockGeocodeAPI(ev)
    .then(enrichedData => ({
      success: true,
      data: { ...ev, ...enrichedData } // Merge original event with location data
    }))
    .catch(() => ({
      success: false,
      id: ev.id // Safeguard the ID from the closure scope
    })))

  const resolvedBatch = await Promise.all(promises);

  // 3. Reduce the results into the exact object structure required
  return resolvedBatch.reduce((acc, result) => {
    if (result.success) {
      acc.successful.push(result.data);
    } else {
      acc.failedIds.push(result.id);
    }
    return acc;
  }, { successful: [], failedIds: [] });
};



const r = await processTelemetryBatch(incomingEvents)
console.log(r)
