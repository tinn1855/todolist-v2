import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Todo } from '@/services/use-get-todos';

interface SelectPriorityProps {
  priority: Todo['priority'];
  onPriorityChange: (priority: Todo['priority']) => void;
}

export function SelectPriority({
  priority,
  onPriorityChange,
}: SelectPriorityProps) {
  return (
    <Select value={priority} onValueChange={onPriorityChange}>
      <SelectTrigger
        className={`w-[100px] ${
          priority === 'high'
            ? 'bg-red-100 text-red-700'
            : priority === 'medium'
            ? 'bg-gray-100 text-gray-700'
            : 'bg-black text-white'
        }`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="high">High</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="low">Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
