import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string, dueDate: string | null) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), dueDate || null);
      setTitle('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:border-white/50 focus:outline-none transition"
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white focus:border-white/50 focus:outline-none transition"
        />
      </div>
      <button
        type="submit"
        disabled={!title.trim()}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white hover:bg-blue-50 text-blue-700 font-medium px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-5 h-5" />
        <span>Adicionar Tarefa</span>
      </button>
    </form>
  );
}
