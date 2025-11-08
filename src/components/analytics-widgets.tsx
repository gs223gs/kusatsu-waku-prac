import type { ReactNode } from 'react';

type Metric = {
  label: string;
  value: string;
  helper?: string;
  trend?: string;
};

type BreakdownDatum = {
  label: string;
  value: number;
  percent: number;
  badge?: string;
};

type TimelinePoint = {
  label: string;
  value: number;
};

type InsightCard = {
  title: string;
  body: string;
  action?: ReactNode;
};

export function SummaryCards({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {metric.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
          {metric.trend ? (
            <p className="text-xs text-emerald-600">{metric.trend} vs last week</p>
          ) : null}
          {metric.helper ? <p className="text-xs text-slate-500">{metric.helper}</p> : null}
        </div>
      ))}
    </section>
  );
}

export function BreakdownList({
  title,
  data,
}: {
  title: string;
  data: BreakdownDatum[];
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate-600">
        {data.map((item) => (
          <li key={item.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900">{item.label}</span>
              <span className="text-slate-500">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-slate-900"
                style={{ width: `${item.percent}%` }}
              />
            </div>
            {item.badge ? <p className="text-xs text-slate-400">{item.badge}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TimelineWidget({
  title,
  points,
}: {
  title: string;
  points: TimelinePoint[];
}) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-4 flex items-end gap-3">
        {points.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2 text-xs text-slate-400">
            <div className="w-full rounded-t-full bg-gradient-to-t from-slate-200 to-slate-900" style={{ height: `${(point.value / maxValue) * 120}px` }} />
            <span>{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InsightGrid({ cards }: { cards: InsightCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <div key={card.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">{card.title}</p>
          <p className="mt-2 text-sm text-slate-600">{card.body}</p>
          {card.action ? <div className="mt-4 text-sm text-slate-900">{card.action}</div> : null}
        </div>
      ))}
    </div>
  );
}
