import { BreakdownList, InsightGrid, SummaryCards, TimelineWidget } from "../components/analytics-widgets";
import { DashboardLayout } from "../components/dashboard-layout";
import { getCategoryAnalytics } from "../lib/analytics";

export default function CategoryPage() {
  const { metrics, breakdown, timeline, insights, capacityTable } = getCategoryAnalytics();

  return (
    <DashboardLayout title="Category Analytics" subtitle="カテゴリ単位の負荷とパイプライン健康度を俯瞰します。">
      <SummaryCards metrics={metrics} />

      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Capacity overview</p>
                <h2 className="text-xl font-semibold text-slate-900">カテゴリ別稼働率</h2>
              </div>
              <span className="text-xs text-slate-500">ロールアップ</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-600">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-2">カテゴリ</th>
                    <th className="pb-2">オーナー</th>
                    <th className="pb-2">稼働率</th>
                    <th className="pb-2">バックログ</th>
                  </tr>
                </thead>
                <tbody>
                  {capacityTable.map((row) => (
                    <tr key={row.name} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-3 font-medium text-slate-900">{row.name}</td>
                      <td className="py-3">{row.owner}</td>
                      <td className="py-3">{row.utilization}</td>
                      <td className="py-3">{row.backlog}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <InsightGrid cards={insights} />
        </div>

        <div className="space-y-6">
          <BreakdownList title="カテゴリ別負荷" data={breakdown} />
          <TimelineWidget title="週次投入量" points={timeline} />
        </div>
      </section>
    </DashboardLayout>
  );
}

export const getConfig = async () => ({
  render: "dynamic" as const,
});
