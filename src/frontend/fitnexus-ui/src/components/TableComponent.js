import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components_ui/ui/table"

export function TableComponent() {
  return (
  <Table>
    <TableCaption>Lista de ejercicios</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">Nombre de ejercicio</TableHead>
        <TableHead className="w-[200px]">Repeticiones</TableHead>
        <TableHead className="w-[200px]">Serie</TableHead>
        <TableHead className="w-[200px]">Peso</TableHead>
        <TableHead className="w-[200px]">Cardio realizado</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Press banca</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">30</TableCell>
        <TableCell className="w-[200px]">FALSE</TableCell>
      </TableRow>
    </TableBody>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Dominadas</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">30</TableCell>
        <TableCell className="w-[200px]">FALSE</TableCell>
      </TableRow>
    </TableBody>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Peso muerto</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">30</TableCell>
        <TableCell className="w-[200px]">FALSE</TableCell>
      </TableRow>
    </TableBody>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Cinta </TableCell>
        <TableCell className="w-[200px]">1</TableCell>
        <TableCell className="w-[200px]">1</TableCell>
        <TableCell className="w-[200px]">45</TableCell>
        <TableCell className="w-[200px]">TRUE</TableCell>
      </TableRow>
    </TableBody>
  </Table>
)
}

export default TableComponent
