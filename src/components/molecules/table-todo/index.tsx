import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function TableTodo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Description Task</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="text-left">
          <TableCell className="font-medium">
            <Checkbox />
          </TableCell>
          <TableCell>Coding page Todo List</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell>$250.00</TableCell>
          <TableCell className="text-right">
            <Button className="mr-2">Edit</Button>
            <Button variant="destructive">Delete</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
