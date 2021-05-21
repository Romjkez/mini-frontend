export function calculatePage(offset: number, perPage: number): number {
  return offset / perPage + 1;
}
