import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  valor: string;
  setValor: (valor: string) => void;
  opciones: string[];
}

export const SelectP = ({ valor, setValor, opciones }: Props) => {
  return (
    <Select value={valor} onValueChange={setValor}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecciona tipo" />
      </SelectTrigger>
      <SelectContent>
        {opciones.map((opcion) => (
          <SelectItem key={opcion} value={opcion}>
            {opcion}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
