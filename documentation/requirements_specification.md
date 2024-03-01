# SOFTWARE REQUIREMENTS SPECIFICATION

## Important notice

The software requirements were changed on the January 22nd as the course instructor gave feedback of the IDA\* algorithm > it's not really suitable for matrix (pixelmap) pathfinding. Later, on March 1st, some spelling issues were fixed.

## General

This is a simple interactive and visual application to compare the most common pathfinding algorithms.

The application is a web-application running on a Node.js server, written mostly with TypeScript (JavaScript). Testing will be performed with Jest.

## Software Core Functionality & Interface

User will be first presented with an empty pixelmap (grid) where user may draw a map of path tiles and wall tiles. Some default maps are also provided. After map making, the user can select the pathfinding algorithm to use.

### Pathfinding algorithms to implement:

- Dijkstra
- A\*
- Jump Point Search (JPS)

After running the algorithm, user will be presented with results, whether the goal was found or not, how much time elapsed and how many tiles had to be traversed through.

Each algorithm will have their respective results constantly displayed for the current map. This way the user may draw conclusions about the performance levels of the algorithms.

## For the course (in finnish)

1. Toteutan JavaScriptillä yllä mainitut polunetsintäalgoritmit ja rakennan yksinkertaisen käyttöliittymän ohjelmaa varten. JS:n lisäksi Pythonia osaan hyvin.
2. Ohjelma tulee olemaan kurssin ajan aina käynnissä ja saavutettavissä netissä, jossa sitä on kaikkien mahdollista kokeilla ja ihmetellä. Lähdekoodi löytyy tietysti GitHubista. Lisään käyttöohjeet josta käy ilmi, kuinka lähdekoodi on mahdollista ladata omalle koneelle ja saada ohjelma toimimaan myössä omassa Localhostissa.
3. Kuulun tietojenkäsittelytieteiden kandidaattiohjelmaan.
4. Dokumentoin kaiken englanniksi.
