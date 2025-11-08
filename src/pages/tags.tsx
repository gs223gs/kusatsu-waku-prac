import { BreakdownList, InsightGrid, SummaryCards, TimelineWidget } from "../components/analytics-widgets";
import { DashboardLayout } from "../components/dashboard-layout";
import { getTagAnalytics } from "../lib/analytics";

export default function TagsPage() {
  const { metrics, breakdown, timeline, insights, tagLeaders } = getTagAnalytics();

  return (
    <DashboardLayout title="Tag Analytics" subtitle="タグの利用状況と負荷分散を可視化し、トリアージを高速化します。">
      <SummaryCards metrics={metrics} />

      <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Top tags</p>
                <h2 className="text-xl font-semibold text-slate-900">パフォーマンスランキング</h2>
              </div>
              <span className="text-xs text-slate-500">今週</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-600">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-2">タグ</th>
                    <th className="pb-2">タスク</th>
                    <th className="pb-2">中央値処理</th>
                    <th className="pb-2">採用率</th>
                  </tr>
                </thead>
                <tbody>
                  {tagLeaders.map((tag) => (
                    <tr key={tag.name} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-3 font-medium text-slate-900">{tag.name}</td>
                      <td className="py-3">{tag.tasks}</td>
                      <td className="py-3">{tag.median}</td>
                      <td className="py-3">{tag.adoption}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <InsightGrid cards={insights} />
        </div>

        <div className="space-y-6">
          <BreakdownList title="利用率" data={breakdown} />
          <TimelineWidget title="週次タグ採用" points={timeline} />
        </div>
      </section>
    </DashboardLayout>
  );
}

export const getConfig = async () => ({
  render: "dynamic" as const,
});
