// Function to hit API after a while
const debounce = (mainFunc: (args: string[]) => void, delay: number) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunc(...args);
    }, delay);
  };
};
