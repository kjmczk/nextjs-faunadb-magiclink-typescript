import useSWR from 'swr';
import Layout from '../components/layout';
import NewTodo from '../components/new-todo';
import TodoItem from '../components/todo-item';
import { TodoDoc } from '../types';
import { useUser } from '../utils/hooks';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Dashboard: React.FC = () => {
  const user = useUser({ redirectTo: '/login' });
  const { data: todos, error } = useSWR('/api/todos/get', fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      {user && todos ? (
        <>
          <div className="mb-4">
            <NewTodo />
          </div>

          <ul className="divide-y">
            {todos.map((todoDoc: TodoDoc) => (
              <li
                key={todoDoc.ref['@ref'].id}
                className="flex justify-between items-center"
              >
                <TodoItem
                  id={todoDoc.ref['@ref'].id}
                  title={todoDoc.data.title}
                  completed={todoDoc.data.completed}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  );
};

export default Dashboard;
