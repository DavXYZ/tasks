Node.js Stream Operations
This repository contains multiple Node.js scripts demonstrating various stream operations, including reading and writing files using streams, transforming data with transform streams, handling back pressure, HTTP streaming, and real-time data processing with socket.io.

Table of Contents
1. Basic Stream Operations
Task Description
2. Transform Streams Homework
Task Description
3. Implementing Basic Back Pressure
Task Description
4. HTTP Streaming
Task Description
5. Real-time Data Processing (Optional)
Task Description
Installation
Usage
1. Basic Stream Operations
Task Description
Write a simple Node.js script using the fs module to read a text file and write it to another text file using streams. Implement this operation both with and without using pipes.

2. Transform Streams Homework
Task Description
Create a Node.js script that uses a transform stream to handle JSON objects. Modify each object by adding a new property timestamp and convert it back into a string before writing it to an output file.

3. Implementing Basic Back Pressure
Task Description
Implement a readable and a writable stream where the writable stream deliberately writes data slower than the readable stream reads it, demonstrating how back pressure is managed.

4. HTTP Streaming
Task Description
Create an HTTP server using the http module that streams a large file to the client upon request instead of loading it into memory all at once.

5. Real-time Data Processing (Optional)
Task Description
Create a small application using socket.io that streams real-time data between a server and client, showcasing the use of duplex streams. Use a simple HTML file for the frontend, and import socket.io with <script src="/socket.io/socket.io.js"></script>.

Clone the repository:
git clone https://github.com/DavXYZ/tasks.git
