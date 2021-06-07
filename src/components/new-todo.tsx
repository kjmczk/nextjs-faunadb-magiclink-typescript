import { mutate } from 'swr';

const NewTodo: React.FC = () => {
  const addTodoOnBlur = async (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;

    if (title) {
      e.preventDefault();
      e.currentTarget.value = '';

      try {
        const res = await fetch('/api/todo/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        if (res.ok) {
          mutate('/api/todos/get');
        } else {
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addTodoOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodoOnBlur(e);
    }
  };

  return (
    <input
      type="text"
      placeholder="What needs to be done?"
      onBlur={addTodoOnBlur}
      onKeyDown={addTodoOnPressEnter}
      className="w-full border rounded p-4"
    />
  );
};

export default NewTodo;
