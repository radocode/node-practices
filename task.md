The Requirements

Write a Node.js function processTelemetryBatch(events) that processes an array of vehicle events.

    It must call the asynchronous function mockGeocodeAPI(event.id) for every item in the array.

    The Catch: If mockGeocodeAPI fails for one vehicle, the entire batch must not crash.

    The function must return a final object containing two things:

        successful: An array of the successfully enriched events.

        failedIds: An array of the event.id strings that threw an error.