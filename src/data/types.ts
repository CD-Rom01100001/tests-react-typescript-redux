/* Questions type */
type AnswersType = {
  section: string;
  value: string;
  correct: boolean;
  id: string;
}
type SectionType = {
  question: string;
  answers: AnswersType[]
}
type QuesitonsType = {
  legalTraining80: SectionType[];
  tacticalSpecialtyTraining10: SectionType[];
  firstAid41: SectionType[];
  useOfSpecialTools20: SectionType[];
  firearmsTraining84: SectionType[];
}



export type {QuesitonsType}