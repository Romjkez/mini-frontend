export interface CreateExerciseDto {
  title: string;
  isVisible?: boolean;
  previewUrl?: string;
  tests: Array<CreateExerciseItemDto>;
  articles: Array<CreateExerciseItemDto>;
  tags: Array<string>;
}

export interface CreateExerciseItemDto {
  id: number;
  order: number;
}
