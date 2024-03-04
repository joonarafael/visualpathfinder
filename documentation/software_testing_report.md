# SOFTWARE TESTING

This document explains the testing solutions for the application.

Other interesting documents include [Implementation Document](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/implementation_document.md "Implementation Document") and [Usage of AI Report](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/usage_of_ai_report.md "Usage of AI Report").

## About

Software testing is performed by the _Jest_ library. Tests do not cover the user interface. Only appropriate functions, algorithms and other core logic is tested. All tests can be found within [this folder](https://github.com/joonarafael/visualpathfinder/tree/main/__tests__/ "Software Unit Tests").

User interface and the application performance in general is manually tested both in development and production.

Tests are automated and integrated to the CI pipeline. They are executed for every single repository push. A coverage report is also generated and can be accessed at Codecov via [this link](https://app.codecov.io/gh/joonarafael/visualpathfinder "Codecov report for Visual Pathfinder").

## Tests

### Basic Unit Testing

Helper functions and classes used in the software are lightly tested with simple use-cases. These include checking normal functionality as well as some edge cases and error situations. Also the pathfinding algorithms are unit tested for really small and simple maps where we check for obstacle detection and situations for no solution.

These tests are located [here](https://github.com/joonarafael/visualpathfinder/tree/main/__tests__/unittests "Unit Tests").

### Pathfinder Tests

The basic unit tests are not a clear sign of working pathfinding algorithms. Thus more robust tests are required to be sure the algorithms work as intended and always find the shortest path. While the route of the shortest path might differ, its absolute length (as in nodes and Euclidean distance) should always be identical.

The pathfinding algorithms are tested both with the smaller interactive 72x46 maps as well as with the larger MovingAI maps (up to 768x768).

#### Smaller Maps

Smaller maps refer to the same maps available to the user in the **interactive application**. These have dimensions of 72x46.

**The 3 algorithms are run in a parallel manner 100 times for each of the 5 included smaller test maps**. Every single iteration has new randomly picked start point and end point. After every single iteration, the return values are compared and the test immediately fails if any algorithm returns a different result for the shortest path.

These tests are located [here](https://github.com/joonarafael/visualpathfinder/tree/main/__tests__/interactive "Interactive Map Tests").

#### Larger Maps

Larger maps refer to the virtual maps available to the user in the **non-interactive application**. These have dimensions of up to 768x768.

**The 3 algorithms are run in a parallel manner 10 times for each of the 2 included larger test maps**. Every single iteration has new randomly picked start point and end point. After every single iteration, the return values are compared and the test immediately fails if any algorithm returns a different result for the shortest path.

These tests are located [here](https://github.com/joonarafael/visualpathfinder/tree/main/__tests__/virtual "Virtual Map Tests").
