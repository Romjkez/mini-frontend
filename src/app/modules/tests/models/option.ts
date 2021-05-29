export interface Option {
  id: number;
  text: string;
  url: string;
  isCorrect: boolean; // TODO: do not expose?
  order?: number;
}
