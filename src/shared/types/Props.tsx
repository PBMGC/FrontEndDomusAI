import type { Campo } from "./Campo";

export interface Props {
  campos: Campo[];
  datos: any[];
  renderOpciones?: (item: any) => React.ReactNode;
}