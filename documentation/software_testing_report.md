# SOFTWARE TESTING

This document explains the testing solutions for the application.

Other interesting documents include [Implementation Document](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/implementation_document.md "Implementation Document") and [Usage of AI Report](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/usage_of_ai_report.md "Usage of AI Report").

## About

Software testing is performed by the _Jest_ library. Tests do not cover the user interface. Only appropriate functions, algorithms and other core logic is tested. All tests can be found within [this folder](https://github.com/joonarafael/visualpathfinder/tree/main/__tests__/ "Software Unit Tests").

User interface and the application performance in general is manually tested both in development and production.

Tests are automated and integrated to the CI pipeline. They are performed for every single repository push. A coverage report is also generated and can be accessed at Codecov via [this link](https://app.codecov.io/gh/joonarafael/visualpathfinder "Codecov report for Visual Pathfinder").

## Tests for Helper Functions and Classes

Helper functions and classes used in the software are lightly tested with simple use-cases. These include checking normal functionality as well as some edge cases and error situations.

## Proper Pathfinder Tests

The complete pathfinder algorithms are tested both with simpler unit tests and larger 'real-life cases', 72x46 map, tests.

FINISH WRITING THIS AFTER ALL TESTS ARE INCLUDED!
