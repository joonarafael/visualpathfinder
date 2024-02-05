# INSTALLATION MANUAL

This manual provides instructions for the cloning of the repository and the installation procedure to get this application running on your own local _Linux_ machine. If you're looking for the general user manual on how to use the [Live Application](https://visualpathfinder.vercel.app/ "https://visualpathfinder.vercel.app/") running on the dedicated web server, consult [this document](https://github.com/joonarafael/visualpathfinder/tree/main/documentation/user_manual.md "User Manual").

**This installation manual describes the process for LINUX systems.** Users of other operating systems might need to consult other documentation to get the application running on their own local machine. However, the installation procedure should be largely similar to the one described here.

## Node.js

Install _Node.js_ for your machine by executing the following command

```
sudo snap install node --classic
```

in the terminal. Ensure successful installation by checking the versions:

```
node --version
```

and

```
npm --version
```

## Yarn (optional)

Install _Yarn_ as your package manager with

```
sudo npm install --global yarn
```

Ensure successful installation by checking the versions:

```
yarn --version
```

You may also use _npm_ as your package manager (installed with Node.js).

## Cloning the repository

Clone the repository to your local machine by executing

```
git clone git@github.com:joonarafael/visualpathfinder.git
```

Enter the repository with

```
cd visualpathfinder
```

## Install dependencies

Install all required dependencies by executing

```
yarn install
```

or with

```
npm install
```

if you decided to go with npm. Replace always `yarn` with `npm` if you're using npm.

## Running the application

After all dependencies have been successfully installed, the application can be started with

```
yarn run dev
```

Now the application can be accessed with a web browser of your choice. Default port for the application is **3000** ([localhost:3000](localhost:3000 "Port 3000 on your localhost")), but you can check it also from the terminal logs after launching the application.

## Software tests

Automated software tests powered by _Jest_ can be performed by running

```
yarn test
```
