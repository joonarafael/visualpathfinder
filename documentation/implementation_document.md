# IMPLEMENTATION DOCUMENT

This document details the implementation of all used algorithms and data structures. I'll also try to explain my though process and reasons why the software is structured the way it is. Design choices for the user interface and other application logic is not provided.

Other interesting documents include [Usage of AI Report](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/usage_of_ai_report.md "Usage of AI Report") and [Software Testing Report](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/software_testing_report "Software Testing Report").

## About Benchmarking and Other Performance Stuff

The application is built with TypeScript and runs on a Node.js server. This somewhat indirectly means that no real empiric examination of the performance can/should be made. This application merely serves as a way to understand and learn the differences between the different pathfinding algorithms and see them in action.

The built-in timer to measure algorithm runtime is accurate to a certain point, but no real conclusions can be drawn out from the resulting numbers. Decision of browser, as well as the general differences between machines and server environments affect too much the performance.

However, the accuracy of the algorithms is still very relevant and the resulting path lengths (both in node count and euclidean distance) should be examined closely.

## Helper Functions and Classes

### Euclidean Distance Function

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/euclidean.ts "Redirect to file 'euclidean.ts'").

The Euclidean distance function calculates the absolute distance between two given points on the map. It also enables diagonal distance calculation where two directly diagonal points have an absolute distance of $\sqrt{2}$.

### Function for Adjacency List Generation

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/generateadjacencylist.ts "Redirect to file 'generateadjacencylist.ts'").

This is a helper function to generate a one-dimensional adjacency list of the current grid status. It completely scans through the current grid and adds every single node and their respective neighbors as 'key, value' pairs into the record. It deals with general wall detection, horizontal obstacle detection and borders. This way e.g. the JPS does not need to have its own obstacle detection logic, it only reads the given adjacency list.

### Diagonal Checking

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/isdiagonal.ts "Redirect to file 'isdiagonal.ts'").

This is a helper function to check whether or not two given points are located on the same diagonal line. The given points do not need to be immediately adjacent.

### Priority Queue Class

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/pq.ts "Redirect to file 'pq.ts'").

This is an important class for the A* and JPS algorithms. It is a specific class object to store individual nodes and their respective priorities in a binary heap data structure. With the utilization of the Priority Queue, A* and JPS may process nodes in a specific order depending on the node priorities.

Special thanks for the suggestion by [psangi-hy](https://github.com/psangi-hy "psangi-hy on GitHub") to change to a heap structure (course peer review issue).

## Pathfinding Algorithms

### Dijkstra

### A\*

### Jump Point Search
