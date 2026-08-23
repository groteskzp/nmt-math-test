import { useEffect, useState } from 'react';

const PER_TASK = 60;

export default function Timer({ startedAt, total, frozen }) {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (!startedAt || frozen) return;

    const tick = () => setSec(Math.floor((Date.now() - startedAt) / 1000));
    tick();

    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [startedAt, frozen]);

  if (!startedAt) return <span className="timer">&nbsp;</span>;

  const budget = total * PER_TASK;
  const left = budget - sec;
  const over = left < 0;
  const abs = Math.abs(left);

  const mm = String(Math.floor(abs / 60)).padStart(2, '0');
  const ss = String(abs % 60).padStart(2, '0');

  return (
    <span className={over ? 'timer over' : 'timer'}>
      {over ? '+' : ''}{mm}:{ss}
    </span>
  );
}