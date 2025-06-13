export interface FamilyData {
  xref_id: string;
  '@HUSBAND'?: string;
  '@WIFE'?: string;
  '@CHILD'?: string;
  '+@CHILD'?: string[];
  [key: string]: any;
}
