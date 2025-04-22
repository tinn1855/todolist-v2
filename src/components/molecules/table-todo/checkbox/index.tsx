import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxColumnProps {
  id: string;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

export function CheckboxColumn({
  id,
  selectedIds,
  onToggleSelect,
}: CheckboxColumnProps) {
  return (
    <Checkbox
      checked={selectedIds.includes(id)}
      onCheckedChange={() => onToggleSelect(id)}
    />
  );
}
