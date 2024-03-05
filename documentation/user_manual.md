# USER MANUAL

This manual provides instructions for the [Live Application](https://visualpathfinder.vercel.app/ "Visual Pathfinder Web Application") running on the dedicated web server. If you're looking for the guide on how to clone this repository and get your own version running on your local machine, please consult [this document](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/installation_manual.md "Installation Manual").

## General Performance Notice

The 72 \* 46 matrix is quite large (3456 individual nodes), not for algorithmic reasons, in particular, but for the React rendering pipeline. More elements on the screen would start to slow down rendering (in my app) (more advanced rendering solutions do exist to circumvent this issue).

Practically all of the application logic (including the algorithms) is run on the client machine by the client browser. Make sure you're running the latest version of your browser to ensure the best performance. In my own personal experience, Chrome has the best support for the included features. Some Firefox versions, for example, may round the timer results to integer values, among other things.

## Important Notice

**Remember that** all recorded statistics will be lost once the map is changed **and** a new algorithm is run. Previous records will be stored as long as no new algorithm is run on the changed map.

## Pathfinder Application

Application is divided into three main sections:

### Map

Major part of the screen is covered by the map screen. It is where the map is displayed and where it can be drawn. Algorithm runs will also be displayed on this grid.

The grid has a total of 72 tiles horizontally and 46 vertically. If the grid zoom is at minimum and application is running in Fullscreen mode, the map should be shown completely at once.

Interact with the grid with your mouse. Drawing happens either by clicking individual tiles or "_painting_"; click and hold mouse down and hover over multiple tiles.

### Tool Bar / Run Bar

Depending on the application state ('drawing' or 'running'), the section of the right side of the screen will be either the _Tool Bar_ or the _Run Bar_:

**Tool Bar**

Tool Bar includes the selection for the current tool.

- Start: Select the start tile. Only one start tile may exist at a time, so the old one will be removed.

- Finish: Select the end tile. Only one end tile may exist at a time, so the old one will be removed.

- Eraser: Erase wall tiles and turn them into regular path tiles.

- Wall: Create walls that cannot be traversed through.

**Run Bar**

Run Bar includes the statistics of recent pathfinding runs.

Here you may compare the different algorithms against each other **on the same map**.

**PLEASE NOTE:** All recorded statistics will be lost once the map is changed **and** a new algorithm is run. Previous records will be stored as long as no new algorithm is run on the changed map.

The statistics will always show

- Runtime: The total amount of time spent executing the algorithm. This time **does not** include the generation of the adjacency list.

- Nodes Visited: The total amount of nodes that were visited during the algorithm execution. These nodes will appear grey on the map.

- Path Length: If the finish is found, the path length will be displayed. The number in the parentheses represents the "Euclidean length" of the path (where diagonal moves are equal to $\sqrt{2}$). The first integer number is the total amount of traversed nodes. If the finish was never found, it will be indicated in a red text instead of these numbers.

### Menu

Every feature of the application can be accessed through the menu located at the top part of the screen.

**File**

- Run Algorithm: Select the algorithm to run on the current map.

- Edit Grid: Switch back to drawing mode (accessible after an algorithm run).

- Load Map: Load ready-made maps. Current map state will be lost.

- Empty Grid: Completely erase the current grid.

- Virtual Maps (opens in a new tab): Select a virtual map for pathfinding. These maps are not interactive but are more suitable for rigorous algorithm benchmarking.

- Log Field to Console: Log the 72x46 grid as a one-dimensional array to the browser console. This feature is helpful if you decide to run this software on your own machine and manipulate the source code. Own maps could be exported with this method (see how maps are stored [within the software](https://github.com/joonarafael/visualpathfinder/tree/main/app/maps "Maps Folder")).

- Exit: Exit to Main Menu.

**Visuals**

- Toggle Borderless Mode: Switch between the original bordered layout and the borderless pixelmap mode.

- Toggle High Contrast Mode: Switch between the smoother toned-down colors and the contrasted colors (enhanced with more saturation and brightness).

- Toggle Indexes: Whether or not display the grid tile indexes. Visible only with zoom level greater than 3. Useful if you decide to debug the pathfinding algorithms on your own machine.

**View**

- Zoom In: Increase the zoom level / zoom closer.

- Zoom Out: Decrease the zoom level / zoom away.

- Zoom Default: Restore the default zoom level.

- Minimum Zoom: Set the minimum available zoom level / zoom as far away as possible.

- Maximum Zoom: Set the maximum available zoom level / zoom as close in as possible.

- Toggle Fullscreen: Enter and exit the fullscreen mode (F11).

## Virtual Maps

Virtual Maps can be accessed through the _File menu_ within the main application. The selected virtual map will be opened into a new tab. Virtual maps are non-interactive. Simple text-based preview is still provided and once algorithms are run, the start point and end point will be rendered onto the map.

Virtual maps are significantly larger than the base 72x46 maps in the main application. This might enable some more interesting scenarios for the algorithm comparison.

Special thanks for the suggestion by [opturtio](https://github.com/opturtio "opturtio on GitHub") to include larger maps (course peer review issue).

Virtual Map page is divided into three different sections:

### Map Preview

A large text-based preview of the current virtual map is shown on the screen. It's non-interactive and does not support zooming or other visual features. It will show start and finish points after algorithms run. However, the found path won't be rendered.

Utilize the X and Y axis of the virtual map preview window to locate the start and end points!

### Statistics Bar

A compact text-window is located right below the map preview window. It describes the exact details of the current map, including e.g. width, height, and amount of traversable path tiles.

After the algorithms have been run, it will also inform the locations of the randomly generated start point and end point. It will also display the the straight line distance between the start and end points. This could be useful to estimate the algorithm run times and overall performance.

### Control Bar

Control bar includes three buttons and three information panels:

**Buttons**

- Exit: Close the tab.

- View Map Source as PNG (opens in a new tab): Display the virtual map as a PNG image. It is scaled down to be seen at once.

- Run Algorithms: Generates first a random start point and a random end point, then runs all 3 algorithms one after the other. Results will update once every algorithm is finished.

**Information Panels**

One information panel is reserved for each algorithm. After user runs the algorithms, the results will be updated to these panels. Included information is identical to the one provided on the [interactive side](https://github.com/joonarafael/visualpathfinder/blob/main/documentation/user_manual.md#tool-bar--run-bar "Tool Bar / Run Bar") of the application.
