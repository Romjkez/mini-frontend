export interface CreateTestDto {
  title: string;
  previewUrl?: string;
  oneOfQuestions?: Array<any>;
  manyOfQuestions?: Array<any>;
  exactAnswerQuestions?: Array<any>;
  orderQuestions?: Array<any>;
  order?: number;
  tags: Array<string>;
}
