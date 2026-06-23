import { swap } from "../utils/swap";
import type { ClassValueProps, TreeNodeProps, VisualizerProps } from "../utils/types";

const buildBubbleSortTree = (A: number[]): TreeNodeProps => {
  const elements = A.map((element, index) => {
    return { value: element, elementIndex: index, translate: 0, visible: true, state: undefined };
  });
  return { id: 1, visualizerData: { A: elements }, left: null, right: null, visible: true };
};

export function generateBubbleSortSteps(A: number[]) {
  const root: TreeNodeProps | null = buildBubbleSortTree(A);
  const generatedSteps: (TreeNodeProps | null)[] = [];
  const messages: string[] = ["Here's a visualization of the entire Bubble sort process."];
  const BUBBLESORT_STYLES: ClassValueProps = {
    cellContainerClass: { highlight: "text-white bg-green-400/40", processing: "text-white bg-blue-400/40", processed: "animate-processed" },
    animationClass: { slide: "animate-slide", visibility: { show: "opacity-100", hidden: "opacity-0" }, transition: "transition-colors duration-450" },
  };
  const visualizer: VisualizerProps = {
    steps: generatedSteps,
    messages: messages,
    classValues: BUBBLESORT_STYLES,
  };

  const saveStep = () => {
    generatedSteps.push(structuredClone(root));
  };

  function generateBubbleSortStepsHelper(current: TreeNodeProps | null) {
    if (!current) return;

    const { A } = current.visualizerData;
    saveStep();
    messages.push("For each pass will move left to right swapping adjacent elements as needed. Each pass moves the next largest element into its final position (these will be shown as green).");

    for (let i = 0; i < A.length - 1; i++) {
      saveStep();
      messages.push(`Starting at pass ${i}`);
      saveStep();
      messages.push("For each element moving through the list.");
      for (let j = 0; j < A.length - i - 1; j++) {
        console.log("hello");
        A[j].state = "processing";
        A[j + 1].state = "processing";
        saveStep();
        messages.push("Compare elements.");
        if (A[j].value > A[j + 1].value) {
          swap(A, j, j + 1);
          saveStep();
          messages.push("Swap.");
        }
        A[j].state = undefined;
      }
      A[A.length - i - 1].state = "highlight";
      saveStep();
      messages.push("Done this pass. The last element processed is now in its final position.");
    }

    A.forEach((e) => (e.state = "processed"));
    saveStep();
    messages.push("Done sorting!");
  }

  saveStep();
  generateBubbleSortStepsHelper(root);

  return visualizer;
}
