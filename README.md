# VISUAL PATHFINDER

*Aineopintojen harjoitustyö: Algoritmit ja tekoäly*, Joona Kettunen, periodi 3 kevät 2024.

**Application is constantly up and running [here](https://visualpathfinder.vercel.app/) hosted by [Vercel](https://vercel.com/)**.

It's recommended to check all documentation provided [here](https://github.com/joonarafael/visualpathfinder/tree/main/documentation). Instructions on how to fork this repository, modify the source code for your use, and get it up and running can be also found within that folder.

## General

This is a visual pathfinder web application, allowing custom user pixelmaps and detailed comparing of different types of pathfinding algorithms. Included algorithms are Dijkstra, A*, and JPS.

## Technical overview

Application built with TypeScript utilizing the React *framework :)*, running on a Node.js server. All application logic is calculated on the client machine to safeguard the server.

When a pathfinding algorithm is run, a simple adjacency list is generated from the 64*64 pixelmap.
