import { BreakdownList, InsightGrid, SummaryCards, TimelineWidget } from "../components/analytics-widgets";
import { DashboardLayout } from "../components/dashboard-layout";
import { getAssigneeAnalytics } from "../lib/analytics";

export default function AsainnPage() {
  const { metrics, breakdown, timeline, insights, workloadTable } = getAssigneeAnalytics();

  return (
    <DashboardLayout title="Asainn Analytics" subtitle="アサイン負荷と SLA 達成状況を可視化してチームを守ります。">
      <SummaryCards metrics={metrics} />

      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Load board</p>
                <h2 className="text-xl font-semibold text-slate-900">メンバー別ヘルス</h2>
              </div>
              <span className="text-xs text-slate-500">SLA モニタリング</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-slate-600">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-2">メンバー</th>
                    <th className="pb-2">フォーカス</th>
                    <th className="pb-2">SLA</th>
                    <th className="pb-2">期限超過</th>
                  </tr>
                </thead>
                <tbody>
                  {workloadTable.map((row) => (
                    <tr key={row.member} className="border-b border-slate-100 last:border-b-0">
                      <td className="py-3 font-medium text-slate-900">{row.member}</td>
                      <td className="py-3">{row.focus}</td>
                      <td className="py-3">{row.sla}</td>
                      <td className="py-3">{row.overdue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <InsightGrid cards={insights} />
        </div>

        <div className="space-y-6">
          <BreakdownList title="担当タスク" data={breakdown} />
          <TimelineWidget title="スプリントごとの割当" points={timeline} />
        </div>
      </section>
    </DashboardLayout>
  );
}

export const getConfig = async () => ({
  render: "dynamic" as const,
});
