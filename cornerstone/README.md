# Cornerstone-GUI

[![License badge](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Docker badge - cornerstone-gui](https://img.shields.io/docker/pulls/dojot/cornerstone-gui.svg)](https://hub.docker.com/r/dojot/cornerstone-gui/)
[![CodeFactor](https://www.codefactor.io/repository/github/dojot/dojot-ui/badge)](https://www.codefactor.io/repository/github/dojot/dojot-ui/cornerstone/badge)

[![codecov](https://codecov.io/gh/dojot/dojot-ui/cornerstone/branch/development/graph/badge.svg)](https://codecov.io/gh/dojot/dojot-ui/cornerstone)

[![Docker badge](https://img.shields.io/docker/pulls/dojot/cornerstone-gui.svg)](https://hub.docker.com/r/dojot/cornerstone-gui/)

The Cornerstone-GUI is responsible for providing a solid structure to be used in microfrontend Dojot's ecosystem. This project is composed by 2 services, as being: the Builder, responsable to create the routes/menu/configurations used in Microfrontend; and the UI itself, a WEB user interface that requests dynamically all new dojot's functionality, based in MFE Architecture and Webpack Module Federation.

## **Table of Contents**

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [Roadmap](#roadmap)
4. [Running the service](#running-the-service)
   1. [Configurations](#configurations)
      1. [General Configurations](#general-configurations)
   2. [Generating Docker](#generating-docker)
5. [Creating a new node](#creating-a-new-node)
6. [Documentation](#documentation)
7. [Issues and help](#issues-and-help)

## Overview

This code is based on Micro Front-end Architecture, using the module-federation plugin by webpack v5.

The basic structure of a MFE application is:

| Key        | Description           | Example                                    | Type   |
| ---------- | --------------------- | ------------------------------------------ | ------ |
| id         | Unique identifier     | dashboard                                  | string |
| remoteName | Component name        | dashboard                                  | string |
| address    | URL to remoteEntry.js | guinx@http://localhost:3003/remoteEntry.js | string |

There are 2 types of MFE applications compatible with the Cornerstone-GUI, internal and external applications.
The Internal applications is configured inside this container (in builder/config.json);
Unfortunately, until this moment, we do not support the second type of application, external MFE applications.

## Dependencies

As the new approach to Dojot GUI's, this service doesn't need any dependecies.

## Roadmap

- Apply useMemo in some functions;
- Apply lighthouse schema validator;

### Present Drawbacks

- Supporting external MFE application;

## Running the Application

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Configurations

Before running the **Cornerstone GUI** service within your environment, make sure you configure the
environment variables to match your needs.

#### UI Configurations

| Key  | Purpose                 | Default Value | Valid Values |
| ---- | ----------------------- | ------------- | ------------ |
| host | Address to access Dojot | localhost     | string       |
| port | Port to access Dojot    | localhost     | integer      |

#### Builder Configurations

The builder configuration must be available in the build environment. To archive this, is possible send the env variables through docker-compose.yml as shown in the example file.

| Key                | Purpose                                | Default Value | Valid Values    |
| ------------------ | -------------------------------------- | ------------- | --------------- |
| BUILDER_MENU_ITENS | Services to be used in the application | '[dashboard]' | array of string |

#### Generating Docker

Beforehand, you need an already running dojot instance in your machine. Check out the
[dojot documentation](https://dojotdocs.readthedocs.io)
for more information on installation methods.

Generate the Docker image:

```shell
docker build -f Dockerfile -t <username>/cornerstone-gui:<tag> . --build-arg  BUILDER_MENU_ITENS='[dashboard, flows]'
```

Then an image tagged as `<username>/cornerstone-gui:<tag>` will be made available. You can send it to
your DockerHub registry to made it available for non-local dojot installations:

```shell
docker push <username>/cornerstone-gui:<tag>
```

**NOTE THAT** you can use the official image provided by dojot in its [DockerHub page](https://hub.docker.com/r/dojot/cornerstone-gui).

## Documentation

Check the documentation for more information:

- [Latest dojot platform documentation](https://dojotdocs.readthedocs.io/en/latest)

## Issues and help

If you found a problem or need help, leave an issue in the main
[dojot repository](https://github.com/dojot/dojot) and we will help you!
