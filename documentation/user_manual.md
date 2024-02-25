# USER MANUAL

This manual provides instructions for the [Live Application](https://visualpathfinder.vercel.app/ "Visual Pathfinder") running on the dedicated web server. If you're looking for the guide on how to clone this repository and get your own version running on your local machine, please consult [this document](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/installation_manual.md "Installation Manual").

## General Performance Notice

The 72 \* 48 matrix is quite large (3456 individual nodes), not for algorithmic reasons, in particular, but for the React rendering pipeline. More elements on screen will start to slow down rendering.

Practically all of the application logic is run on the client machine by the client browser. Make sure you're running the latest version of your browser to ensure the best performance. The less wall tiles, the more possible paths for the selected algorithm to consider. If you're experiencing performance issues, try placing the start and end nodes closer together and increase the number of wall tiles.

## Important Notice

**Remember that** all recorded statistics will be lost once the map is changed **and** a new algorithm is run. Previous records will be stored as long as no new algorithm is run on the changed map.

## Application Layout

Application is divided into three main sections:

### Grid

Major part of the screen is covered by the main application grid. It is where the map is displayed and where it can be drawn. Algorithm runs will also be displayed on this grid.

The grid has a total of 72 tiles horizontally and 48 vertically. If the grid zoom is at minimum and application is running in Fullscreen mode, the map should be shown completely at once.

Interact with the grid with mouse. Drawing happens either by clicking individual tiles or "_painting_"; click and hold mouse down and hover over multiple tiles.

### Tool Bar / Run Bar

Depending on the application state, drawing / running, the section of the right side of the screen will be either the _Tool Bar_ or the _Run Bar_:

**Tool Bar**

Tool Bar includes selection for the current tool.

- Start: Select the start tile. Only one start tile may exist at a time, so the old one will be removed.

- Finish: Select the end tile. Only one goal tile may exist at a time, so the old one will be removed.

- Eraser: Erase wall tiles and turn them into regular path tiles.

- Wall: Create walls that cannot be traversed through.

**Run Bar**

Run Bar includes the statistics of recent pathfinding runs.

Here you may compare the different algorithms against each other **on the same map**.

**PLEASE NOTE:** All recorded statistics will be lost once the map is changed **and** a new algorithm is run. Previous records will be stored as long as no new algorithm is run on the changed map.

The statistics will always show

- Runtime: The total amount of time spent executing the algorithm. This time **includes** the generation of the adjacency list.

- Nodes Visited: The total amount of nodes that were visited during the algorithm execution. These nodes will appear grey on the map.

- Path Length: If the finish is found, the path length will be displayed. The number in the parentheses represents the "Euclidean length" of the path (where diagonal moves are equal to $\sqrt{2}$). The other number is the total amount of traversed nodes. If the finish was never found, it will be indicated in a red text instead of these numbers.

### Menu

Nearly every feature of the application can be accessed through the menu.

**File**

- Run Algorithm: Select the algorithm to run on current map.

- Edit Grid: Switch back to drawing mode.

- Load Map: Load ready-made maps. Current map state will be lost.

- Empty Grid: Completely erase the current grid.

- Log Field to Console: Log the 72x48 grid as a one-dimensional array to the browser console (open with F12). This feature is helpful if you decide to run this software on your own machine and manipulate the source code. Own maps could be exported with this method (see how maps are stored [within the software](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps "Maps Folder")).

- Exit: Exit to Main Menu.

**Visuals**

- Toggle Borderless Mode: Switch between the original bordered layout and the borderless pixelmap mode. It's recommended not to change to the borderless mode until you've established a large enough map as no scale can be seen in the borderless mode.

- Toggle High Contrast Mode: Switch between the smoother toned-down colors and the contrasted colors enhanced with more saturation and brightness.

**View**

- Zoom In: Increase the zoom level / zoom closer.

- Zoom Out: Decrease the zoom level / zoom away.

- Zoom Default: Restore the default zoom level.

- Minimum Zoom: Set the minimum available zoom level / zoom as far away as possible.

- Maximum Zoom: Set the maximum available zoom level / zoom as close in as possible.

- Toggle Fullscreen: Enter and exit the fullscreen mode (F11).
