import { Column } from "./tableTypes";

export interface DataItem {
  [key: string]: string | number;
}

export type DataStateProps = {
  setAxlesData: (axlesData: DataItem[]) => void;
  columns: Column[];
};
export interface ChartDataPoint {
  x: string | number;
  y: number;
}
export type DataProps = {
  dataPoints: ChartDataPoint[];
};
