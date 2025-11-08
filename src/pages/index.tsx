import { Link } from 'waku';
import { TodoApp } from '../components/todo-app';

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600">{data.body}</p>
      <TodoApp />
      <Link to="/about" className="mt-4 inline-block underline">
        About page
      </Link>
    </div>
  );
}

const getData = async () => {
  const data = {
    title: 'Waku TODO',
    headline: 'Simple TODO list',
    body: 'Keep track of quick tasks directly in the browser. Items live in component state so there is nothing to configure.',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
