import { BreakdownList, InsightGrid, SummaryCards, TimelineWidget } from "../components/analytics-widgets";
import { DashboardLayout } from "../components/dashboard-layout";

const metrics = [
  { label: "アクティブカテゴリ", value: "9", trend: "+6%" },
  { label: "カテゴリ平均稼働", value: "68%", helper: "目標 70%" },
  { label: "ボトルネックカテゴリ", value: "2", trend: "-1" },
  { label: "SLA 達成率", value: "92%" },
];

const breakdown = [
  { label: "Platform", value: 38, percent: 78, badge: "SRE + Core" },
  { label: "Growth", value: 24, percent: 52, badge: "+6 件" },
  { label: "Enablement", value: 18, percent: 37, badge: "安定" },
  { label: "Compliance", value: 12, percent: 25, badge: "レビュー待ち" },
];

const timeline = [
  { label: "Week 1", value: 28 },
  { label: "Week 2", value: 34 },
  { label: "Week 3", value: 41 },
  { label: "Week 4", value: 37 },
];

const insights = [
  {
    title: "Capacity",
    body: "Platform カテゴリで 15% のスパイク。Release 処理を Growth チームに一部移譲すると平準化できます。",
  },
  {
    title: "Quality",
    body: "Enablement の完了リードタイムは 3.8 日。テンプレ指示を追加すると 1.2 日短縮できる見込み。",
  },
];

const capacityTable = [
  { name: "Platform", owner: "Aya", utilization: "82%", backlog: "11" },
  { name: "Growth", owner: "Kai", utilization: "64%", backlog: "5" },
  { name: "Enablement", owner: "Mina", utilization: "57%", backlog: "3" },
  { name: "Compliance", owner: "Leo", utilization: "48%", backlog: "2" },
];

export default function CategoryPage() {
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
