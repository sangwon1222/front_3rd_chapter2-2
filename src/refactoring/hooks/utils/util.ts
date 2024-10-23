export function debounce(func: (args: any) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(args), delay);
  };
}
