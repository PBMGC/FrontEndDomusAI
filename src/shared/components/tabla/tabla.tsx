import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Props } from "@/shared/types/Props";


export const TablaGenerica = ({ campos, datos, renderOpciones }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {campos.map((campo) => (
            <TableHead
              key={campo.clave}
              className={
                campo.alignCenter
                  ? "text-center"
                  : campo.alignRight
                  ? "text-right"
                  : ""
              }
            >
              {campo.titulo}
            </TableHead>
          ))}
          {renderOpciones && <TableHead className="text-right">Opciones</TableHead>}
        </TableRow>
      </TableHeader>

      {datos.length > 0 ?(
        <TableBody>
        {datos.map((item, index) => (
          <TableRow key={item.id || index}>
            {campos.map((campo) => (
              <TableCell
                key={campo.clave}
                className={
                  campo.alignCenter
                    ? "text-center"
                    : campo.alignRight
                    ? "text-right"
                    : ""
                }
              >
                {campo.render
                  ? campo.render(item)
                  : getValorProfundo(item, campo.clave)}
              </TableCell>
            ))}
            {renderOpciones && (
              <TableCell className="text-right">
                {renderOpciones(item)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      ):(
        <TableFooter>
        <TableRow>
          <TableCell colSpan={datos.length}>NO HAY DATOS</TableCell>
        </TableRow>
      </TableFooter>
      )}
    </Table>
  );
};

function getValorProfundo(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}
