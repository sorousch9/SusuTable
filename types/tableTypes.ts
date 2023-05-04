export interface Column {
  name: string;
  fieldName: string;
  dataTypeName: string;
  cachedContents: {
    largest: string;
    smallest: string;
  };
}

export interface DataRow {
  [key: string]: string | number;
}
export interface Value {
  textValue: string;
  minValue: number;
  maxValue: number;
  startDate: string;
  endDate: string;
}
export type PropsColumns = {
  columns: Column[];
};
export type PropsStateColumns = {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
};
