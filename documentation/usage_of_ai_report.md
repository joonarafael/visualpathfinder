# USAGE OF AI & LARGE LANGUAGE MODELS

This document details different sections of the software where AI assisted in the coding process.

Other interesting documents include [Implementation Document](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/implementation_document.md "Implementation Document") and [Software Testing Report](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/software_testing_report.md "Software Testing Report").

## Tabnine

I've got _[Tabnine](https://www.tabnine.com/ "Tabnine Homepage")_ installed as a third-party plugin in my VS Code. It's a context-aware AI assistant for IDEs that autocompletes, suggests functions and generates blocks of code based on other code found in the file/project. This plugin, however, provides little to no help with any actual logic.

## Other Features

Additionally, here I've collected a summary of some more major parts of the application that required the consulting of a large language model. With AI I'm usually referring to _Chat GPT_. Sometimes _Google Gemini_ was the assistant.

- **Jest Unittests**: AI helped initialize the first basic layout for a Jest test file.

- **Adjacency List Generation function**: AI assisted building approx. half of the function after I provided all the inputs and requirements for the function.

- **Priority Queue**: AI helped build the core functionality for the binary heap data structure. Some inconsistencies and errors had to be manually fixed. AI also later helped a ton to debug and troubleshoot the PQ class and its numerous inconsistencies.

- **Dijkstra's algorithm**: AI assisted in converting my own Dijkstra algorithm slightly so it would take an adjacency _list_ as an argument as opposed to an adjacency _matrix_. AI also helped by debugging the issues related to the creation of the `shortestPath` array.

- **A\* algorithm**: AI helped to debug issues with infinite A\* execution loops. Also gave some helpful information about the proper updating procedure for the PQ.

- **JPS algorithm**: AI wrote some pseudocode for the JPS and its helper functions. This gave me a good starting point, but AI generated code was **widely inaccurate** and **only covered partial functionality**. Next to no code provided by the AI is present in the final application.

Some other use cases of AI that merely focused on the UI and some other visual features have not been documented.
