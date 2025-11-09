import { Task } from '../lib/supabase';
import { Trash2, Calendar, Clock } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const isOverdue = (dateString: string | null) => {
    if (!dateString || task.completed) return false;
    return new Date(dateString) < new Date();
  };

  const dueDateTime = formatDate(task.due_date);
  const overdue = isOverdue(task.due_date);

  return (
    <div
      className={`group flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${
        task.completed
          ? 'bg-gray-50 border-gray-200'
          : overdue
          ? 'bg-red-50 border-red-200'
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
      }`}
    >
      <button
        onClick={() => onToggle(task.id, !task.completed)}
        className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${
          task.completed
            ? 'bg-blue-600 border-blue-600'
            : overdue
            ? 'border-red-400 hover:border-red-500'
            : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        {task.completed && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`text-base font-medium transition ${
            task.completed
              ? 'text-gray-500 line-through'
              : overdue
              ? 'text-red-900'
              : 'text-gray-900'
          }`}
        >
          {task.title}
        </p>

        {dueDateTime && (
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div
              className={`flex items-center gap-1.5 text-xs font-medium ${
                task.completed
                  ? 'text-gray-400'
                  : overdue
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{dueDateTime.date}</span>
            </div>
            <div
              className={`flex items-center gap-1.5 text-xs font-medium ${
                task.completed
                  ? 'text-gray-400'
                  : overdue
                  ? 'text-red-600'
                  : 'text-gray-600'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{dueDateTime.time}</span>
            </div>
            {overdue && !task.completed && (
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                Atrasada
              </span>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
        title="Excluir tarefa"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
