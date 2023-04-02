<p align="center">
	<a href="https://github.com/Marcocanc/TouchTracker/"><img width="500" src="https://user-images.githubusercontent.com/1622982/229364370-c2beb7c5-985b-4729-af42-7b378bf5ba6d.png" alt="TouchTracker" /></a><br />Green Screen Touch Screen Tracking for After Effects<br />
</p>

## Intro
Have you ever watched a movie where an actor uses their phone or tablet but the underlying animations just didn't feel right? I've seen plenty, so when the time came for us to film a video commercial for our app, I came up with the idea for TouchTracker to avoid having to manually track interactions and ensure perfect animations.

## TouchTracker
TouchTracker is a simple web app for mobile devices that displays a greenscreen and records all gestures performed on the screen.
It outputs a json file that can be imported into AE with the included `.jsx` script. The script then generates a new composition with the exact screen resolution and imports each gesture as an animated "Null Object".

Say goodbye to poorly synced screen replacements with TouchTracker 🪄

![touchtracker2](https://user-images.githubusercontent.com/1622982/229368354-6f784518-559e-4c80-a759-6a8ed7cc1b43.gif)

## Getting Started
Disclaimer: This has only been tested on iOS but should work on Android as well.

1. Go to https://marcocanc.github.io/TouchTracker/ on your mobile device
2. Press the Share button and then "Add to Homescreen"
3. Film your device while interacting with the screen
4. When done, touch the screen with 3 fingers at the same time (might take a few tries). A window will open
5. Transfer the file to your computer
6. In AE, select "Run Script" and select the `touchtracker.jsx` file
7. Select the file you have transferred from your mobile device
8. A new comp should open up with the screen and null objects representing each gesture. 
9. Perform a screen replacement on the video recording of your device and sync the timing of your null object timeline to the video.
