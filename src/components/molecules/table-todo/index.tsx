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
import { Todo } from '@/hooks/use-get-todos';
interface TableTodoProps {
  todos: Todo[];
}
export function TableTodo({ todos }: TableTodoProps) {
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
        {todos.map((todo) => (
          <TableRow className="text-left" key={todo.id}>
            <TableCell className="font-medium">
              <Checkbox />
            </TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.status}</TableCell>
            <TableCell>{todo.priority}</TableCell>
            <TableCell className="text-right">
              <Button className="mr-2">Edit</Button>
              <Button variant="destructive">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
