
export interface ChartDataPoint {
  dimension: string | number;
  measure: number;
}
export type DataProps = {
  dataPoints: ChartDataPoint[];
};
