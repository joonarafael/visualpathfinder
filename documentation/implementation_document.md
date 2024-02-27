# IMPLEMENTATION DOCUMENT

This document details the implementation of all used algorithms and data structures. I'll also try to explain my though process and reasons why the software is structured the way it is. Design choices for the user interface and other general web application logic are not provided.

Other interesting documents include [Usage of AI Report](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/usage_of_ai_report.md "Usage of AI Report") and [Software Testing Report](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/software_testing_report.md "Software Testing Report").

## About Benchmarking and Other Performance Stuff

The application is built with TypeScript and runs on a Node.js server. This somewhat indirectly means that no real empiric examination of the performance can/should be made. This application merely serves as a way to understand and learn the differences between the different pathfinding algorithms and see them in action.

The built-in timer to measure algorithm runtime is accurate to a certain point, but no real conclusions can be drawn out from the resulting numbers. Decision of browser, as well as the general differences between machines and server environments affect too much the performance. Resulting performance numbers even within the **same environment**, **same map** and **same algorithm** can differ over 50% at times.

However, the accuracy of the algorithms is still very relevant and the resulting path lengths (both in node count and euclidean distance) should be examined closely. All pathfinders are designed to find the shortest path (maybe different but equally long) and if given results differ, we have to start searching for issues and inconsistencies within the code logic.

## Design Choices

### Helper Functions and Classes

#### Euclidean Distance Function

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/euclidean.ts "Redirect to file 'euclidean.ts'").

The Euclidean distance function calculates the absolute distance between two given points on the map. It also enables diagonal distance calculation where two directly diagonal points have an absolute distance of $\sqrt{2}$.

#### Function for Adjacency List Generation

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/generateadjacencylist.ts "Redirect to file 'generateadjacencylist.ts'").

This is a helper function to generate a one-dimensional adjacency list of the current grid status. It completely scans through the current grid and adds every single node and their respective neighbors as 'key, value' pairs into the record. It deals with general wall detection, horizontal obstacle detection and borders. This way the pathfinders do not need their own obstacle detection logic, reading the given adjacency list is enough.

#### Diagonal Checking

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/isdiagonal.ts "Redirect to file 'isdiagonal.ts'").

This is a helper function to check whether or not two given points are located on the same diagonal line. The given points do not need to be immediately adjacent (e.g. absolute distance > $\sqrt{2}$).

#### Priority Queue Class

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/pq.ts "Redirect to file 'pq.ts'").

This is an important class for the A* and JPS algorithms. It is a specific class object to store individual nodes and their respective priorities in a binary heap data structure. With the utilization of the Priority Queue, A* and JPS may process nodes in a specific order depending on the node priorities.

Special thanks for the suggestion by [psangi-hy](https://github.com/psangi-hy "psangi-hy on GitHub") to change to a heap structure (course peer review issue).

### Pathfinding Algorithms

Dijkstra and A\* were required foreknowledge for the course. I'll still briefly explain them. JPS was the new thing I learned during the completion of this project.

Every included algorithm utilizes the one-dimensional adjacency list to perform the pathfinding. JPS requests the current field status to check if scanning reaches the edge of the map. Other two algorithms perform the pathfinding solely on the given adjacency list.

#### Dijkstra

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/dijkstra.ts "Redirect to file 'dijkstra.ts'").

Dijkstra algorithm blindly expands from the start node and continues to widen the search area until it finds the end node or alternatively visits all nodes but never finds the end node. It has no higher understanding of the graph, every node is equally important.

The Dijkstra version implemented in this web application has one added optimization; it cuts the scanning process when it reaches the end node. If e.g. the start and end nodes are immediately adjacent, no other nodes have to be processed.

#### A\*

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/astar.ts "Redirect to file 'astar.ts'").

A\* is drastically faster than Dijkstra. It performs better due to the fact that it knows the location of the end node. Therefore it always prioritizes nodes closer to the end node. It will process lesser nodes only after reaching a dead end.

A\* still has to process each immediately adjacent node, but the amount of nodes cuts down so low that it finds the end noticeably faster than Dijkstra.

#### Jump Point Search

See the source code [here](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms/jps.ts "Redirect to file 'jps.ts'").

JPS is a specially optimized version of A\*. It is blessed with the knowledge of the end node location and therefore utilizes the same kind of node prioritizing as the base A\*.

The JPS algorithm takes advantage of the known fact that **tile maps** (e.g. pixel maps, uniform grids, undirected, unweighted) have some special attributes in their symmetry. What does this mean?

TODO: explain pruning and forced neighbors, maybe include images...
