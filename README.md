# VISUAL PATHFINDER

![example workflow](https://github.com/joonarafael/visualpathfinder/actions/workflows/testing.yml/badge.svg) [![codecov](https://codecov.io/gh/joonarafael/visualpathfinder/graph/badge.svg?token=V8S1HKI7V1)](https://codecov.io/gh/joonarafael/visualpathfinder)

_Aineopintojen harjoitustyö: Algoritmit ja tekoäly_, Joona Kettunen, periodi 3 kevät 2024.

Application is constantly up and running [here](https://visualpathfinder.vercel.app/ "Visual Pathfinder Web Application") hosted by [Vercel](https://vercel.com/ "Vercel Homepage").

It's recommended to **check all the documentation** provided within [this folder](https://github.com/joonarafael/visualpathfinder/tree/main/documentation "Project Documentation Folder"). Instructions on how to clone this repository, modify the source code for your use, and **get it up and running on your own machine** can be also found within that folder.

## General

This is a web application demonstrating visually different pathfinding algorithms with an interactive map, allowing detailed algorithm comparing on both ready-made maps and custom user maps. Included algorithms are _Dijkstra_, _A\*_, and _JPS_. All 3 algorithms support 8-way movement (e.g. cardinal directions and diagonal traversal).

## Technical overview

This is a React web application built in TypeScript running on a Node.js server. All algorithms and other application logic executes on the client machine to safeguard the server.

Application uses Tailwind CSS for styling and additionally features ready-made UI components provided by the [shadcn/ui library](https://ui.shadcn.com/ "shadcn/ui Homepage").

Automatic software testing powered by the Jest library. Tests cover the core application logic and perform robust testing for the 3 provided algorithms. The user interface is not covered by automatic testing. Coverage report of the automatic testing can be found [here](https://app.codecov.io/gh/joonarafael/visualpathfinder "Codecov Report for Visual Pathfinder").

## Algorithms

All three pathfinding algorithms, as well as all helper functions and classes, are written in TypeScript. More detailed documentation about the algorithms can be found from [this document](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/implementation_document.md "Implementation Document").

The source for the algorithms can be found in [this folder](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms "Application Algorithm Folder"). All other files merely support the web application and e.g. provide the rendering of the user interface.

## Credits for Maps

Benchmark maps are created entirely by me.

### Baldur's Gate

Downloaded from the [MovingAI Benchmarks](https://www.movingai.com/benchmarks/index.html "Moving AI Lab Map Benchmarks"). These Baldur's Gate maps have been cropped, rescaled, and converted into 1bit color scheme. Out of this 1bit image, a specific [Python script](https://github.com/joonarafael/visualpathfinder/tree/main/supportingtools/1bitimagetolist.py "1 Bit Image to Array Python Script") has been used to generate an appropriate array for permanent data storing.

### City Maps

- **CITY 1** (stored in the file named [city0](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps/cities/city0.tsx "Open File 'city0.tsx'")) generated from [this map](https://nextcity.org/images/made/BoeingStreetNetworkVisualLead_920_642_920_642_80.jpg "Open Original Reference for City 1").

- **CITY 2** (stored in the file named [city1](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps/cities/city1.tsx "Open File 'city1.tsx'")) generated from [this map](https://s.hdnux.com/photos/61/76/04/13099288/3/rawImage.jpg "Open Original Reference for City 2").

- **CITY 3** (stored in the file named [city2](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps/cities/city2.tsx "Open File 'city2.tsx'")) generated from [this map](https://s.hdnux.com/photos/61/76/04/13099293/3/rawImage.jpg "Open Original Reference for City 3").

Same kind of processing has been done for the city maps as was described earlier.

### Virtual Maps

All virtual maps are downloaded from [MovingAI Benchmarks](https://www.movingai.com/benchmarks/index.html "Moving AI Lab Map Benchmarks"). The original maps have been converted into one-dimensional arrays using a specific [Python script](https://github.com/joonarafael/visualpathfinder/tree/main/supportingtools/convertmaptoarray.py "Convert Moving AI map to Array Python Script") to suit the application logic (0/1 syntax).
