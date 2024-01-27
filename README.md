# VISUAL PATHFINDER

![example workflow](https://github.com/joonarafael/visualpathfinder/actions/workflows/testing.yml/badge.svg) [![codecov](https://codecov.io/gh/joonarafael/visualpathfinder/graph/badge.svg?token=V8S1HKI7V1)](https://codecov.io/gh/joonarafael/visualpathfinder)

_Aineopintojen harjoitustyö: Algoritmit ja tekoäly_, Joona Kettunen, periodi 3 kevät 2024.

**Application is constantly up and running [here](https://visualpathfinder.vercel.app/ "Visual Pathfinder") hosted by [Vercel](https://vercel.com/ "Vercel Homepage")**.

It's recommended to check all documentation provided within [this folder](https://github.com/joonarafael/visualpathfinder/tree/main/documentation "Project documentation folder"). Instructions on how to clone this repository, modify the source code for your use, and get it up and running can be also found within that folder.

## General

This is a visual pathfinder web application, allowing custom user pixel maps and detailed comparing of different types of pathfinding algorithms. Included algorithms are Dijkstra, A\*, and JPS.

## Technical overview

Application built with TypeScript utilizing the React _framework :)_, running on a Node.js server. All application logic is calculated on the client machine to safeguard the server.

Automatic unittesting enabled by the Jest library, tests cover the core application logic. The user interface is not covered by automatic testing. Report of the automatic testing can be found [here](https://app.codecov.io/gh/joonarafael/visualpathfinder "Codecov report").

When a pathfinding algorithm is run, a simple adjacency list is generated from the pixel map. Selected pathfinding algorithm will be performed on this adjacency list.
