enum SectionTypeEnum {
  table = 'table',
  column = 'column',
  noBorderTable = 'noBorderTable'
}

interface ColumnPayload {
  label: string;
  value: string | number;
};

interface TablePayload {
  widths: string[] | number[];
  header: string[];
  items: any[];
};

interface PdfSection {
  title: string;
  type: SectionTypeEnum;
  columns?: number;
  data: any;
};

interface PdfBody {
  title: string;
  id: string;
  data: PdfSection[];
};

export {
  SectionTypeEnum,
  ColumnPayload,
  TablePayload,
  PdfSection,
  PdfBody
};
