import { TodoApp } from "../components/todo-app";

export default async function HomePage() {
  const data = await getData();

  return <TodoApp />;
}

const getData = async () => {
  const data = {
    title: "Waku TODO",
    headline: "Simple TODO list",
    body: "Keep track of quick tasks directly in the browser. Items live in component state so there is nothing to configure.",
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
