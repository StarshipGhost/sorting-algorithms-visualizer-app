import type { ClassValueProps, ElementProps, TreeNodeProps, VisualizerProps } from "../utils/types";

const buildSelectionSortTree = (A: number[]): TreeNodeProps => {
  const elements = A.map((element, index) => {
    return { value: element, elementIndex: index, translate: 0, visible: true, state: undefined };
  });
  return { id: 1, visualizerData: { A: elements }, left: null, right: null, visible: true };
};

export function generateSelectionSortSteps(A: number[]) {
  const root: TreeNodeProps | null = buildSelectionSortTree(A);
  const generatedSteps: (TreeNodeProps | null)[] = [];
  const messages: string[] = ["Here's a visualization of the entire Selection sort process."];
  const SELECTIONSORT_STYLES: ClassValueProps = {
    cellContainerClass: { highlight: "text-white bg-green-400/40", processing: "text-white bg-blue-400/40", processed: "animate-processed" },
    cellClass: [],
    animationClass: { slide: "animate-slide", visibility: { show: "opacity-100", hidden: "opacity-0" }, transition: "transition-colors duration-450" },
  };
  const visualizer: VisualizerProps = {
    steps: generatedSteps,
    messages: messages,
    classValues: SELECTIONSORT_STYLES,
  };

  const saveStep = () => {
    generatedSteps.push(structuredClone(root));
  };

  function swap(elements: ElementProps[], i: number, j: number) {
    const tempValue = elements[i].value;
    elements[i] = { ...elements[i], value: elements[j].value };
    elements[j] = { ...elements[j], value: tempValue };
  }

  function generateSelectionSortStepsHelper(current: TreeNodeProps | null) {
    if (!current) return;

    const { A } = current.visualizerData;

    saveStep();
    messages.push("For each pass, we will move left to right looking for the next smallest value. Once that is found, it will swapped into its final position (these will be shown in yellow).");

    let x = -1;
    for (let i = 0; i < A.length; i++) {
      let min = A[i].value;
      let minIndex = i;
      saveStep();
      messages.push(`Starting pass ${i}.`);
      A[minIndex].state = "highlight";
      saveStep();
      messages.push("Initialize smallIndex.");
      saveStep();
      messages.push("For each element moving through the list, the smallest seen so far is always green.");
      for (let j = i + 1; j < A.length; j++) {
        A[j].state = "processing";
        saveStep();
        messages.push("Compare the smallest seen so far.");
        if (A[j].value < min) {
          A[minIndex].state = undefined;
          saveStep();
          messages.push("Found something smaller, so switch the value of smallIndex.");
          min = A[j].value;
          minIndex = j;
          A[j].state = "highlight";
        } else {
          A[j].state = undefined;
        }
        x = minIndex;
      }
      saveStep();
      messages.push("Now swap the next smallest element into place.");
      swap(A, i, minIndex);
      A[x].state = undefined;
      A[i].state = "processed";
      saveStep();
      messages.push("Done this pass.");
    }

    saveStep();
    messages.push("Done sorting!");
  }

  saveStep();
  generateSelectionSortStepsHelper(root);

  return visualizer;
}
