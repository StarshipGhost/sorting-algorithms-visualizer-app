import type {SortingAlgorithmProps} from './types'

export const mergesortIntroduction: SortingAlgorithmProps['introduction'] = {
  title: 'Merge Sort',
  description:
    'Merge sort is a sorting algorithm based on divide and conquer apporach. It works by repeatedly splitting the array into smaller halves until each part contains only one element. Then, those smaller parts are merged back together in sorted order by comparing their values step by step. This makes merge sort easy to visualize, since the algorithm clearly separates the process into two main phases: dividing the array and merging it back into sorted result.',
  timeComplexity: {worst: 'O(n log n)', average: 'O(n log n)', best: 'O(n log n)'},
}

export const mergesortLengthRange: SortingAlgorithmProps['lengthRange'] = [4, 8]

export const quicksortIntroduction: SortingAlgorithmProps['introduction'] = {
  title: 'Quick Sort',
  description:
    'Quicksort sorting algorithm based on the divide-and-conquer approach. It works by choosing one element as a pivot, then rearranging the array so that smaller values are placed before the pivot and larger values are placed after it. The same process is then applied recursively to the left and right parts of the array until everything is sorted',
  timeComplexity: {worst: 'O(n²)', average: 'O(n log n)', best: 'O(n log n)'},
}

export const quicksortLengthRange: SortingAlgorithmProps['lengthRange'] = [4, 8]

export const insertionsortIntroduction: SortingAlgorithmProps['introduction'] = {
  title: 'Insertion Sort',
  description:
    'Insertion sort builds the sorted array one element at a time. Starting from the second element, it compares the current value with the elements before it and inserts it into its correct position within the already sorted portion of the array. This process is repeated until all elements have been placed in order. The algorithm resembles the way many people sort a hand of playing cards.',
  timeComplexity: {worst: 'O(n)', average: 'O(n²)', best: 'O(n²)'},
}

export const insertionsortLengthRange: SortingAlgorithmProps['lengthRange'] = [6, 12]

export const selectionsortIntroduction: SortingAlgorithmProps['introduction'] = {
  title: 'Selection Sort',
  description:
    'Selection sort works by repeatedly finding the smallest element in the unsorted portion of the array and moving it to its correct position at the beginning. After each pass, the sorted portion grows while the unsorted portion shrinks. This simple approach makes it easy to understand and visualize, as each step selects the next element that belongs in the final sorted order.',
  timeComplexity: {worst: 'O(n²)', average: 'O(n²)', best: 'O(n²)'},
}

export const selectionsortLengthRange: SortingAlgorithmProps['lengthRange'] = [6, 12]

export const bubblesortIntroduction: SortingAlgorithmProps['introduction'] = {
  title: 'Bubble sort',
  description:
    'Bubble sort repeatedly compares adjacent elements and swaps them whenever they are in the wrong order. As the algorithm progresses, larger values "bubble" toward the end of the array while smaller values move toward the beginning. The process continues until no more swaps are needed, indicating that the array is fully sorted. Its step-by-step swapping behavior makes it one of the most intuitive sorting algorithms to visualize.',
  timeComplexity: {worst: 'O(n)', average: 'O(n²)', best: 'O(n²)'},
}

export const bubblesortLengthRange: SortingAlgorithmProps['lengthRange'] = [6, 12]

export const CELL_SIZE = 48 //in px
