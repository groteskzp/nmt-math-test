import topics from '@/data/topics.json';

export const TOPICS = topics;

export function buildCounts(total) {
  const steps = [10, 20, 30, 60];
  return [...steps.filter(n => n < total), total];
}
export function getTopicTitle(id) {
  return topics.find(t => t.id === id)?.title ?? '';
}