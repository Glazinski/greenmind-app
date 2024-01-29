# GreenMind Android App

## Introduction
This app is designed for a group engineering project. 
The project's objective was to create a device for taking care of plants. 
Its basic features include reading plant parameters 
such as air and soil humidity, temperature, and light density. 
It also allows users to water their plants remotely.

## Features
* Authentication and authorization using JWT.
* Reading device parameters: air/soil humidity, temperature, and light intensity.
* Watering plants with a button click.
* Validating the watering queue to prevent overwatering.
* Bar charts for all device parameters for the last 7 days.
* Pairing devices with unique codes.
* CRUD operations for managing user devices.
* Private, public, favorite, and device-assigned plant lists.
* CRUD operations for all types of plants mentioned above.
* A multistep form for adding new plants.
* Dark and light themes.
* English and Polish languages, which can be changed in settings.

## Installation
First, you need to setup growbox-backend on docker or locally on Linux.
As a result, you'll be able to develop app.
### 1. Install necessary dependencies
```
npm install
```
### 2. Login to eas
You'll need eas account to create development build. 
I use them to make native libraries work with expo.
You can find more information about them here
[Create your first build](https://docs.expo.dev/build/setup/).

1. Install EAS CLI globally
```
npm install -g eas-cli
```
2. Login to your expo account
```
eas login
```
### 3. Run EAS build
After signing up, you can run following command to create development build
```
npm run build:prod-apk
```
Wait until your build is put on the queue. 
Progress can be tracked in the terminal or on expo.dev.

![expo terminal build process](./assets/readme/expo-terminal-build-process.png)
![expo web build process](./assets/readme/expo-web-build-process.png)

In the terminal, you will be prompted with a question. 
Type `Y` to install the app on the emulator

![expo install app on emulator](./assets/readme/expo-install-on-emulator.png)

Select the `debug/app-debug.apk` application in the terminal

![expo app to run](./assets/readme/expo-app-to-run.png)

In case of problems related to ADB, uninstall your app with following command:
```
adb uninstall growbox-app-v2
```

Download .tar file with app .apk from expo.dev:

![expo app to run](./assets/readme/expo-apk-build-download.png)

Extract all and go to debug directory.
Then, install it manually with following command:
```
adb install ./app-debug.apk
```

Now, you should be ready to go.

## Development
### 1. How to run
Run app with development environment variables:
```
npm run start:local
```

Run app with production environment variables:
```
npm run start:prod
```
### 2. Environment variables:
For development environment, you need to provide your machine IP address.
It is needed due to our docker network configuration.
```
EXPO_PUBLIC_API_URL=http://your.ip.address:3000/api/v1/
EXPO_PUBLIC_IP_ADDRESS=your.ip.address
```