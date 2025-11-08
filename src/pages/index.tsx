import { DashboardLayout } from "../components/dashboard-layout";
import { TodoApp } from "../components/todo-app";

export default function HomePage() {
  return (
    <DashboardLayout
      title="Team Productivity Dashboard"
      subtitle="ルーティングを跨いでも統一したUXで運用できるよう設計しています。"
    >
      <TodoApp />
    </DashboardLayout>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
