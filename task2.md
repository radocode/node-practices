The Scenario

Your system just reconnected to a massive fleet of vehicles that were offline. 
You suddenly have an array of 10,000 telemetry events that need to be processed via mockGeocodeAPI().

If you map all 10,000 into a single Promise.all(), the external API will instantly block you with an HTTP 429 
Too Many Requests error, or your Node.js heap will crash from holding 10,000 pending promises in memory.

The Requirements

Write a function processInBatches(events, batchSize) that processes the events array in smaller chunks.

    It must process exactly batchSize number of events concurrently.

    It must wait for the current batch to fully complete before starting the next batch.

    It must return a single, flat array containing the results of all 10,000 events, in the same order they were received.

    Assume mockGeocodeAPI(id) always succeeds for this specific test (to keep the focus purely on the batching logic).