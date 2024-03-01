# VISUAL PATHFINDER

![example workflow](https://github.com/joonarafael/visualpathfinder/actions/workflows/testing.yml/badge.svg) [![codecov](https://codecov.io/gh/joonarafael/visualpathfinder/graph/badge.svg?token=V8S1HKI7V1)](https://codecov.io/gh/joonarafael/visualpathfinder)

_Aineopintojen harjoitustyö: Algoritmit ja tekoäly_, Joona Kettunen, periodi 3 kevät 2024.

Application is constantly up and running [here](https://visualpathfinder.vercel.app/ "Visual Pathfinder") hosted by [Vercel](https://vercel.com/ "Vercel Homepage").

It's recommended to **check all the documentation** provided within [this folder](https://github.com/joonarafael/visualpathfinder/tree/main/documentation "Project Documentation Folder"). Instructions on **how to clone this repository**, modify the source code for your use, **and get it up and running on your own machine** can be also found within that folder.

## General

This is a visual pathfinder web application, allowing custom user pixel maps and detailed comparing of different types of pathfinding algorithms. Included algorithms are _Dijkstra_, _A\*_, and _JPS_ (under construction). All 3 algorithms support 8-way movement (cardinal directions and diagonals).

## Technical overview

Application built with TypeScript utilizing the React _framework :)_, running on a Node.js server. All pathfinding algorithms are run on the client machine to safeguard the server.

Application uses Tailwind CSS for styling and additionally features ready-made UI components provided by the [shadcn/ui library](https://ui.shadcn.com/ "shadcn/ui Homepage").

Automatic software testing powered by the Jest library. Tests cover the core application logic. The user interface is not covered by automatic testing. Coverage report of the automatic testing can be found [here](https://app.codecov.io/gh/joonarafael/visualpathfinder "Codecov Report").

## Algorithms

The source code for all the core features, such as the pathfinding algorithms, logic to generate adjacency lists and e.g. Euclidean distance function can be found in [this folder](https://github.com/joonarafael/visualpathfinder/tree/main/app/application/algorithms "Application Algorithm Folder").

All other files merely support the web application and e.g. provide the rendering of the user interface.

## Credits for Maps

Benchmark maps are created entirely by me.

### Baldur's Gate

Downloaded from the [MovingAI Benchmarks](https://www.movingai.com/benchmarks/index.html "Moving AI Lab Map Benchmarks"). These Moving AI maps have been cropped, rescaled, and converted into 1bit color scheme. Out of this 1bit image, a specific [Python script](https://github.com/joonarafael/visualpathfinder/tree/main/supportingtools/1bitimagetolist.py "1 Bit Image to Array Python Script") has been used to generate an appropriate array for permanent data storing.

### City Maps

- **CITY 1** (stored in the file named [city0](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps/cities/city0.tsx "Open File 'city0.tsx'")) generated from [this map](https://nextcity.org/images/made/BoeingStreetNetworkVisualLead_920_642_920_642_80.jpg "Open Original Reference for City 1").

- **CITY 2** (stored in the file named [city1](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps/cities/city1.tsx "Open File 'city1.tsx'")) generated from [this map](https://s.hdnux.com/photos/61/76/04/13099288/3/rawImage.jpg "Open Original Reference for City 2").

- **CITY 3** (stored in the file named [city2](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps/cities/city2.tsx "Open File 'city2.tsx'")) generated from [this map](https://s.hdnux.com/photos/61/76/04/13099293/3/rawImage.jpg "Open Original Reference for City 3").

Same kind of processing has been done for the city maps as was described in the [Baldur's Gate maps](https://github.com/joonarafael/visualpathfinder?tab=readme-ov-file#baldursgate).

### Virtual Maps

Downloaded from the [MovingAI Benchmarks](https://www.movingai.com/benchmarks/index.html "Moving AI Lab Map Benchmarks"). These maps have been converted into one-dimensional arrays using a specific [Python script](https://github.com/joonarafael/visualpathfinder/tree/main/supportingtools/convertmaptoarray.py "Convert Moving AI map to Array Python Script") to suit the application logic.
