import { analyticsTasks, type AnalyticsTask } from '../data/analytics-data';

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function computeMedian(values: number[]) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function groupBy<T>(array: T[], getKey: (item: T) => string) {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    const key = getKey(item);
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {});
}

export function getTagAnalytics() {
  const tasksWithTags = analyticsTasks.filter((task) => task.tags.length);
  const tagCounts = new Map<string, { count: number; cycleTimes: number[] }>();

  tasksWithTags.forEach((task) => {
    task.tags.forEach((tag) => {
      const current = tagCounts.get(tag) ?? { count: 0, cycleTimes: [] };
      current.count += 1;
      current.cycleTimes.push(task.cycleTimeHours);
      tagCounts.set(tag, current);
    });
  });

  const uniqueTags = tagCounts.size;
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1].count - a[1].count);
  const totalTaggedTasks = tasksWithTags.length;

  const metrics = [
    { label: 'アクティブタグ', value: String(uniqueTags), trend: `+${Math.max(uniqueTags - 15, 0)}%` },
    { label: 'タグ付きタスク', value: String(totalTaggedTasks), helper: `全体の ${formatPercent((totalTaggedTasks / analyticsTasks.length) * 100)}` },
    {
      label: '再利用率',
      value: formatPercent((topTags.slice(0, 5).reduce((sum, [, stats]) => sum + stats.count, 0) / Math.max(totalTaggedTasks, 1)) * 100),
    },
    { label: 'ユニークタグ', value: String(uniqueTags), helper: 'タクソノミー拡張中' },
  ];

  const breakdown = topTags.slice(0, 4).map(([tag, stats]) => ({
    label: tag,
    value: stats.count,
    percent: Math.round((stats.count / topTags[0][1].count) * 100),
    badge: `${stats.count} 件`,
  }));

  const timelineBuckets = dayLabels.map((label) => ({ label, value: 0 }));
  tasksWithTags.forEach((task) => {
    const day = new Date(task.updatedAt).getDay();
    timelineBuckets[day].value += 1;
  });

  const tagLeaders = topTags.slice(0, 4).map(([tag, stats]) => ({
    name: tag,
    tasks: stats.count,
    median: `${computeMedian(stats.cycleTimes).toFixed(1)}h`,
    adoption: formatPercent((stats.count / totalTaggedTasks) * 100),
  }));

  const insights = [
    {
      title: 'タグ粒度',
      body: `1 タスクあたりの平均タグ数は ${(tasksWithTags.reduce((sum, task) => sum + task.tags.length, 0) / Math.max(tasksWithTags.length, 1)).toFixed(1)}。複数タグタスクは完了が速い傾向です。`,
    },
    {
      title: 'ガバナンス',
      body: `${uniqueTags - topTags.length ? '命名ルールのズレは最小限。' : ''} アーカイブ候補タグを整理するとさらに明瞭になります。`,
    },
  ];

  return {
    metrics,
    breakdown,
    timeline: timelineBuckets,
    insights,
    tagLeaders,
  };
}

export function getCategoryAnalytics() {
  const categories = analyticsTasks.flatMap((task) => task.categories);
  const categoryCounts = groupBy(analyticsTasks, (task) => task.categories[0] ?? 'Other');
  const categoryNames = Object.keys(categoryCounts);
  const uniqueCategories = categoryNames.length;
  const categoryOwners: Record<string, string> = {
    Platform: 'Aya',
    Growth: 'Kai',
    Enablement: 'Mina',
    Compliance: 'Leo',
  };

  const metrics = [
    { label: 'アクティブカテゴリ', value: String(uniqueCategories), trend: '+6%' },
    { label: 'カテゴリ平均稼働', value: formatPercent((analyticsTasks.length / (uniqueCategories * 10)) * 100), helper: '目標 70%' },
    {
      label: 'ボトルネックカテゴリ',
      value: String(categoryNames.filter((name) => categoryCounts[name].length >= 5).length),
      trend: '-1',
    },
    { label: 'SLA 達成率', value: formatPercent((analyticsTasks.filter((task) => task.status === 'done').length / analyticsTasks.length) * 100) },
  ];

  const breakdown = categoryNames
    .map((name) => ({
      label: name,
      value: categoryCounts[name].length,
      percent: Math.round((categoryCounts[name].length / Math.max(categories.length, 1)) * 100 * 2),
      badge: `${categoryCounts[name].filter((task) => task.priority === 'high').length} high prio`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const timelineBuckets = [1, 2, 3, 4].map((week) => ({ label: `Week ${week}`, value: 0 }));
  analyticsTasks.forEach((task) => {
    const date = new Date(task.updatedAt);
    const weekIndex = Math.min(3, Math.floor((date.getDate() - 1) / 7));
    timelineBuckets[weekIndex].value += 1;
  });

  const insights = [
    {
      title: 'Capacity',
      body: `最も混雑しているカテゴリは ${breakdown[0]?.label ?? 'N/A'}。バックログの一部を他カテゴリへ移管すると稼働率が平準化します。`,
    },
    {
      title: 'Quality',
      body: 'Enablement の完了リードタイムは 3.8 日。テンプレ整備で 1.2 日短縮できます。',
    },
  ];

  const capacityTable = breakdown.map((item) => ({
    name: item.label,
    owner: categoryOwners[item.label] ?? 'Unassigned',
    utilization: formatPercent((item.value / analyticsTasks.length) * 160),
    backlog: String(categoryCounts[item.label]?.filter((task) => task.status === 'open').length ?? 0),
  }));

  return {
    metrics,
    breakdown,
    timeline: timelineBuckets,
    insights,
    capacityTable,
  };
}

export function getassignAnalytics() {
  const assignMap = new Map<string, AnalyticsTask[]>();
  analyticsTasks.forEach((task) => {
    task.assigns.forEach((assign) => {
      const list = assignMap.get(assign) ?? [];
      list.push(task);
      assignMap.set(assign, list);
    });
  });

  const uniqueassigns = assignMap.size;
  const avgTasks = analyticsTasks.length / Math.max(uniqueassigns, 1);
  const variance =
    [...assignMap.values()].reduce((sum, tasks) => sum + Math.pow(tasks.length - avgTasks, 2), 0) /
    Math.max(uniqueassigns, 1);

  const metrics = [
    { label: 'アクティブメンバー', value: String(uniqueassigns), trend: `+${Math.max(uniqueassigns - 8, 0)}` },
    { label: '平均タスク数', value: avgTasks.toFixed(1), helper: '1 メンバーあたり' },
    { label: '負荷偏差', value: `±${Math.sqrt(variance).toFixed(1)}`, trend: '-0.3' },
    {
      label: 'レスポンス中央値',
      value: `${computeMedian(analyticsTasks.map((task) => task.responseTimeHours)).toFixed(1)}h`,
    },
  ];

  const breakdown = [...assignMap.entries()]
    .map(([name, tasks]) => ({
      label: name,
      value: tasks.length,
      percent: Math.round((tasks.length / Math.max(avgTasks * 2, 1)) * 100),
      badge: `${tasks.filter((task) => task.priority === 'high').length} high prio`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  const timelineBuckets = [1, 2, 3, 4].map((sprint) => ({ label: `Sprint ${sprint}`, value: 0 }));
  analyticsTasks.forEach((task) => {
    timelineBuckets[task.sprint - 1].value += 1;
  });

  const insights = [
    {
      title: 'Load balancing',
      body: `${breakdown[0]?.label ?? 'Alice'} への集中が続いています。Ops タスクを他メンバーへ振り替えると偏差が低減。`,
    },
    {
      title: 'Response',
      body: 'レスポンスの遅いタスクはカスタマータグが多め。トリアージテンプレの自動入力が有効です。',
    },
  ];

  const workloadTable = [...assignMap.entries()].map(([member, tasks]) => {
    const overdue = tasks.filter((task) => task.status === 'open' && new Date(task.dueDate) < new Date('2025-02-04')).length;
    const sla = formatPercent(((tasks.length - overdue) / Math.max(tasks.length, 1)) * 100);
    const focus = tasks[0]?.categories[0] ?? 'General';
    return {
      member,
      focus,
      sla,
      overdue: String(overdue),
    };
  });

  return {
    metrics,
    breakdown,
    timeline: timelineBuckets,
    insights,
    workloadTable,
  };
}
