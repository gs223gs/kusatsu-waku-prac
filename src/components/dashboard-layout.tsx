import type { ReactNode } from 'react';

const primaryNav = [
  { label: 'Dashboard', href: '/' },
  { label: 'Tags', href: '/tags' },
  { label: 'Category', href: '/category' },
  { label: 'Assignee', href: '/assignee' },
];

const boardNav = [
  { label: 'Backlog', href: '/#backlog' },
  { label: 'Pipeline', href: '/#pipeline' },
  { label: 'Resources', href: '/#resources' },
];

type DashboardLayoutProps = {
  title: string;
  subtitle: string;
  primaryActionLabel?: string;
  children: ReactNode;
};

export function DashboardLayout({
  title,
  subtitle,
  primaryActionLabel = '新規ボード',
  children,
}: DashboardLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-8 lg:flex">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Waku SaaS</p>
            <p className="mt-2 text-2xl font-semibold text-white">Nimbus Board</p>
          </div>
          <nav className="space-y-6 text-sm text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Workspace</p>
              <ul className="mt-3 space-y-1">
                {primaryNav.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-white/10"
                    >
                      <span>•</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Boards</p>
              <ul className="mt-3 space-y-1">
                {boardNav.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-white/10"
                    >
                      <span>▸</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
            <p className="font-semibold text-white">アップグレード</p>
            <p className="mt-1 text-slate-400">SLA と監査ログを有効化して、組織全体の可視性を高めましょう。</p>
            <button className="mt-3 w-full rounded-xl bg-white/20 py-2 font-semibold text-white">
              Go Pro
            </button>
          </div>
        </aside>

        <div className="flex-1 bg-slate-50 text-slate-900">
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/80 px-6 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Command Center</p>
              <h1 className="mt-1 text-3xl font-semibold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                <span className="text-slate-400">/</span>
                <span> ショートカット</span>
              </div>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                {primaryActionLabel}
              </button>
            </div>
          </header>

          <div className="space-y-8 px-6 py-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
