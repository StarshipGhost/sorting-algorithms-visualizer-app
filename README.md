# Sorting Algorithms Visualizer

This project is a visualizer web application that demonstrates how popular sorting algorithms operate through smooth, step-by-step animations. Users can generate custom datasets, control playback, adjust animation speed, and inspect each algorithm's behavior in detail. Built with React, TypeScript, and Tailwind CSS,

## Demo

The live demo of the application is available [<u>here</u>](https://starshipghost.github.io/sorting-algorithms-visualizer-app/).

<video controls>
  <source src="./public/Demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Features

- **Algorithm Visualizations**: Currently supports the following sorting algorithms: 
  - Selection sort
  - Insertion sort
  - Bubble sort
  - Quick sort
  - Merge sort
- **Interactive Playback Controls**: Play, pause, step forward, step backwards and reset the visualization at any time.
- **Step-by-Step Visualization**: Navigate through each recorded sorting step, allowing users to analyze every comparison and swap.
- **Random Dataset Generation**: Instantly generate new arrays to observe how algorithms behave with different inputs.
- **Customizable Settings**: Users can adjust the speed of the visualization, the size of the array. 
- **Smooth Animations**: Visual cues and transitions clearly illustrate comparisons, swaps, and element movement.

## Built With

- **React**: Builds the user interface using reusable components and managed the application's state throughout the visualization.
- **Vite**: Provides a fast development environment with instant hot module replacement and optimized production builds.
- **TypeScript**: Adds static type checking to improve code reliability, maintainability, and developer experience.
- **Tailwind CSS**: Used to create a responsive and modern interface with utility-first styling and smooth transitions.
- **CSS Transitions & Transforms**: Powers the animations that visually represent comparisons, swaps, and element movement during sorting.

## Usage

1. **Choose an algorithm** from the algorithm selector in the side bar.
2. **Generate a random dataset** or create your own.
3. **Start the visualization** to watch the algorithm sort the array.
4. **Control the playback** by pausing, resetting, or moving forward and backward one step at a time.
5. **Adjust the animation speed** to observe the algorithm more closely or speed up the visualization.
