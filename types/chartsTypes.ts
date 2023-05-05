import { Column } from "./tableTypes";

export interface DataItem {
  [key: string]: string | number;
}

export type DataStateProps = {
  setAxlesData: (axlesData: DataItem[]) => void;
  columns: Column[];
};
export interface ChartDataPoint {
  dimension: string | number;
  measure: number;
}
export type DataProps = {
  dataPoints: ChartDataPoint[];
};
