export const formatNames = (names: string[]) => {
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`
  }
  if (names.length > 2) {
    for (let i = 0; i < names.length - 1; i++) {
      names[i] += ',';
    }
    return `${names.join(' ')} and ${names[names.length - 1]}`;
  }
}