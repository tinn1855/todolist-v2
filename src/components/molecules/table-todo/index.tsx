import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  onStatusChange?: (id: number, status: Todo['status']) => void;
}
export function TableTodo({ todos, onStatusChange }: TableTodoProps) {
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
            <TableCell>
              <Select
                value={todo.status}
                onValueChange={(value: Todo['status']) =>
                  onStatusChange?.(todo.id, value)
                }
              >
                <SelectTrigger
                  className={`w-[120px] ${
                    todo.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
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
