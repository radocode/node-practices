The Scenario

Your NestJS server is receiving a continuous, massive stream of diagnostic data from a fleet of connected vehicles. 

The data is flowing in via a Node.js EventEmitter (a stream).

You need to find the highest engine temperature recorded for each vehicle during this session.
The Requirements

Write an asynchronous function processDiagnostics(stream) that takes an EventEmitter.

    The stream will emit 'data' events. Each event provides an object like: { id: "car_101", temp: 95 }.

    The stream will eventually emit an 'end' event, signaling no more data is coming.

    Your function must return a Promise that resolves only when the stream ends, 
    returning an object mapping each vehicle ID to its absolute highest temperature.