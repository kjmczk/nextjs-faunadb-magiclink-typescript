import { mutate } from 'swr';
import { TodoDoc } from '../types';

type Data = Pick<TodoDoc['data'], 'title' | 'completed'>;

type Props = {
  id: string;
} & Data;

const TodoItem: React.FC<Props> = ({ id, title, completed }: Props) => {
  const deleteTodo = async () => {
    try {
      const res = await fetch(`/api/todo/${id}/delete`, {
        method: 'DELETE',
      });

      if (res.ok) {
        mutate('/api/todos/get');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (data: Data) => {
    try {
      const res = await fetch(`/api/todo/${id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        console.log('updated!');
        mutate('/api/todos/get');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodoCompleted = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateTodo({ title, completed: !completed });
  };

  const updateTodoTitleOnBlur = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.value !== title) {
      updateTodo({ title: e.currentTarget.value, completed });
    }
  };

  const updateTodoTitleOnPressEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      updateTodoTitleOnBlur(e);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={updateTodoCompleted}
      />

      <input
        type="text"
        defaultValue={title}
        onBlur={updateTodoTitleOnBlur}
        onKeyDown={updateTodoTitleOnPressEnter}
        className={`w-full p-2 ${completed ? 'line-through' : undefined}`}
      />

      <span onClick={deleteTodo} className="text-red-600 cursor-pointer">
        Delete
      </span>
    </>
  );
};

export default TodoItem;
