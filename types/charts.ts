export interface DataItem {
  [key: string]: string | number;
}
export type DataProps = {
  axlesData: DataItem[];
};
export type DataStateProps = {
    setAxlesData: (axlesData: DataItem[]) => void;
  };