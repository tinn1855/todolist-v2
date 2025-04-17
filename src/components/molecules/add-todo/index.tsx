import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddTodo() {
  return (
    <form className="flex gap-2">
      <label htmlFor="inputAdd" className="w-5/6">
        <Input placeholder="Add your text" id="inputAdd" />
      </label>
      <Button className="w-1/6">Add</Button>
    </form>
  );
}
