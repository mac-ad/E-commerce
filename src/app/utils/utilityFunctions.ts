/**
 * Creates a debounced version of a function that delays its execution
 * until after a specified wait time has elapsed since the last time it was invoked
 * 
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the input function
 */
export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
