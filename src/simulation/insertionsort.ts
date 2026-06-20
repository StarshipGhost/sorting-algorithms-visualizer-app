import type { ClassValueProps, ElementProps, TreeNodeProps, VisualizerProps } from "../utils/types";

const buildInsertionSortTree = (A: number[]): TreeNodeProps => {
  const elements = A.map((element, index) => {
    return { value: element, elementIndex: index, translate: 0, visible: true, state: undefined };
  });
  return { id: 1, visualizerData: { A: elements }, left: null, right: null, visible: true };
};

export function generateInsertionSortSteps(A: number[]) {
  const root: TreeNodeProps | null = buildInsertionSortTree(A);
  const generatedSteps: (TreeNodeProps | null)[] = [];
  const messages: string[] = ["Here's a visualization of the entire Insertion sort process."];
  const INSERTIONSORT_STYLES: ClassValueProps = {
    cellContainerClass: { highlight: "text-white bg-green-400/40", processing: "text-white bg-blue-400/40", processed: "animate-processed" },
    cellClass: [],
    animationClass: { slide: "animate-slide", visibility: { show: "opacity-100", hidden: "opacity-0" }, transition: "transition-colors duration-450" },
  };
  const visualizer: VisualizerProps = {
    steps: generatedSteps,
    messages: messages,
    classValues: INSERTIONSORT_STYLES,
  };

  const saveStep = () => {
    generatedSteps.push(structuredClone(root));
  };

  function swap(elements: ElementProps[], i: number, j: number) {
    const tempValue = elements[i].value;
    elements[i] = { ...elements[i], value: elements[j].value };
    elements[j] = { ...elements[j], value: tempValue };
  }

  function generateInsertionSortStepsHelper(current: TreeNodeProps | null) {
    if (!current) return;

    const { A } = current.visualizerData;
    A[0].state = "highlight";
    saveStep();
    messages.push(
      "Highlighted green records to the left are always sorted. We begin with the record in position 0 in the sorted portion, and we will be moving the record in position 1 (in blue) to the left until it is sorted.",
    );

    for (let i = 0; i < A.length - 1; i++) {
      let j = i + 1;
      A[j].state = "processing";
      saveStep();
      messages.push(`Processing record at position ${j}.`);
      saveStep();
      messages.push("Move the blue record to the left until it reaches the correct position.");
      while (j > 0 && A[j].value < A[j - 1].value) {
        A[j - 1].state = "processing";
        A[j].state = "highlight";
        swap(A, j, j - 1);
        saveStep();
        messages.push("Swap.");
        j--;
      }
      A[j].state = "highlight";
    }

    A.forEach((e) => (e.state = "processed"));
    saveStep();
    messages.push("Done sorting!");
  }

  saveStep();
  generateInsertionSortStepsHelper(root);

  return visualizer;
}
