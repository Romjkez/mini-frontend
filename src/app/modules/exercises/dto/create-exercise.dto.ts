export interface CreateExerciseDto {
  title: string;
  isVisible?: boolean;
  previewUrl?: string;
  tests: Array<number>;
  articles: Array<number>;
  tags: Array<string>;
}
