export type Campo = {
  clave: string;
  titulo: string;
  alignCenter?: boolean;
  alignRight?: boolean;
  render?: (item: any) => React.ReactNode;
};