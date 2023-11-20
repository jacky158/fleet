let index = 0;

export function createKey() {
  index += 1;
  return `i${index}`;
}
export default createKey;
