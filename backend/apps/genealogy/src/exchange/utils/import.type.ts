export interface FamilyData {
  xref_id: string;
  '@HUSBAND'?: string;
  '@WIFE'?: string;
  '@CHILD'?: string;
  '+@CHILD'?: string[];
  [key: string]: any;
}

export const monthMap: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
  ENE: 0,
  FEBR: 1,
  MARZ: 2,
  ABR: 3,
  MAYO: 4,
  JUNIO: 5,
  JULIO: 6,
  AGO: 7,
  SEPT: 8,
  OCTUB: 9,
  NOVIEM: 10,
  DIC: 11,
};
