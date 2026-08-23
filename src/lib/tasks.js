import tasks from '@/data/tasks.json';

export function getTasks(topicId, count) {
  return tasks.filter(task => task.topic === topicId).slice(0, count);
}

export function getTaskCount(topicId) {
  return tasks.filter(task => task.topic === topicId).length;
}
