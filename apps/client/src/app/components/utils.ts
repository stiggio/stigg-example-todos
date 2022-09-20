export function getColor(index: number) {
  const COLORS = ['#8783d1', '#aa9aba', '#bfa4a4', '#d1abad', '#e3b9bc'];
  return COLORS[index % COLORS.length];
}
