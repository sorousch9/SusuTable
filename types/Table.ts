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
  