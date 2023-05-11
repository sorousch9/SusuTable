export interface HeaderType {
  name: string;
  metadata: {
    rowLabel: string;
  };
}
export type PropsHeader = {
  appDescription: HeaderType | undefined;
};
