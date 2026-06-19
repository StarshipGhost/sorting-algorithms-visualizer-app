import type {SortingAlgorithmProps} from './types'

export const mergesortIntroduction: SortingAlgorithmProps['introduction'] = {
  title: 'Merge Sort',
  description:
    'Merge sort is a sorting algorithm based on divide and conquer apporach. It works by repeatedly splitting the array into smaller halves until each part contains only one element. Then, those smaller parts are merged back together in sorted order by comparing their values step by step. This makes merge sort easy to visualize, since the algorithm clearly separates the process into two main phases: dividing the array and merging it back into sorted result.',
  timeComplexity: {worst: 'O(n log n)', average: 'O(n log n)', best: 'O(n log n)'},
}

export const quicksortIntroduction: SortingAlgorithmProps['introduction'] = {
  title: 'Quick Sort',
  description:
    'Quicksort sorting algorithm based on the divide-and-conquer approach. It works by choosing one element as a pivot, then rearranging the array so that smaller values are placed before the pivot and larger values are placed after it. The same process is then applied recursively to the left and right parts of the array until everything is sorted',
  timeComplexity: {worst: 'O(n²)', average: 'O(n log n)', best: 'O(n log n)'},
}

export const CELL_SIZE = 48 //in px
