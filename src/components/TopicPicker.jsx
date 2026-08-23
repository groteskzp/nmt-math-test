import { useState } from 'react';
import { TOPICS, buildCounts } from '@/lib/topics';
import { getTaskCount } from '@/lib/tasks';

export default function TopicPicker({ onStart, isRunning }) {
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const [count, setCount] = useState(10);

  const total = getTaskCount(topicId);
  const available = buildCounts(total);
  const safeCount = available.includes(count) ? count : available[0];

  return (
    <div className="picker">
      <select
        value={topicId}
        onChange={(e) => setTopicId(e.target.value)}
        disabled={isRunning}
      >
        {TOPICS.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </select>

      <select
        value={safeCount}
        onChange={(e) => setCount(Number(e.target.value))}
        disabled={isRunning}
      >
        {available.map((n) => (
          <option key={n} value={n}>
            {n === total ? `Усі (${n})` : `${n} завдань`}
          </option>
        ))}
      </select>

      <button onClick={() => onStart(topicId, safeCount)}>
        {isRunning ? 'Заново' : 'Старт'}
      </button>
    </div>
  );
}