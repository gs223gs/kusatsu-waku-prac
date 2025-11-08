import { BreakdownList, InsightGrid, SummaryCards, TimelineWidget } from "../components/analytics-widgets";
import { DashboardLayout } from "../components/dashboard-layout";

const metrics = [
  { label: "アクティブタグ", value: "18", trend: "+14%" },
  { label: "タグ付きタスク", value: "126", helper: "今週 +32" },
  { label: "再利用率", value: "78%", trend: "+4%" },
  { label: "ユニークタグ", value: "34", helper: "タクソノミー拡張中" },
];

const breakdown = [
  { label: "Urgent", value: 42, percent: 82, badge: "+8 件 / 24h" },
  { label: "Backend", value: 33, percent: 64, badge: "API チーム" },
  { label: "Design", value: 21, percent: 41, badge: "UI レビュー" },
  { label: "Ops", value: 17, percent: 34, badge: "SLO 見直し" },
];

const timeline = [
  { label: "Mon", value: 9 },
  { label: "Tue", value: 14 },
  { label: "Wed", value: 18 },
  { label: "Thu", value: 12 },
  { label: "Fri", value: 20 },
  { label: "Sat", value: 7 },
  { label: "Sun", value: 6 },
];

const insights = [
  {
    title: "タグ粒度",
    body: "1 タスクあたりの平均タグ数は 2.4。複数タグが付与されたタスクは完了速度が 18% 早い傾向です。",
  },
  {
    title: "ガバナンス",
    body: "命名規則違反のタグは 2 件のみ。アーカイブ候補のタグを整理するとボードがさらに読みやすくなります。",
  },
];

const tagLeaders = [
  { name: "Urgent", tasks: 42, median: "2.1h", adoption: "91%" },
  { name: "UX Audit", tasks: 28, median: "5.4h", adoption: "64%" },
  { name: "Release", tasks: 24, median: "3.2h", adoption: "58%" },
  { name: "Customer", tasks: 19, median: "4.0h", adoption: "41%" },
];

export default function TagsPage() {
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
