type Campo = {
  nombre: string;
  type: "text" | "number" | "email" | "date";
};

export type EsquemaInsert = {
  titulo_boton: string;
  titulo_modal: string;
  metodo_submit: (data: any) => void;
  campos: Campo[];
};
