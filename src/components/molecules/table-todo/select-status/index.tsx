import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Todo } from '@/services/use-get-todos';

interface SelecStatusProps {
  status: Todo['status'];
  onStatusChange: (status: Todo['status']) => void;
}

export function SelecStatus({ status, onStatusChange }: SelecStatusProps) {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger
        className={`w-[120px] ${
          status === 'completed'
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
  );
}
