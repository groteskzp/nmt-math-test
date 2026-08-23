export default function Stats({ answers, total, tasks }) {
  const list = Object.values(answers);
  const correct = list.filter((a) => a.isCorrect).length;
  const avgMs = list.length
    ? list.reduce((sum, a) => sum + a.ms, 0) / list.length
    : 0;

  function download() {
    const result = {
      finishedAt: new Date().toISOString(),
      total,
      correct,
      avgSec: Number((avgMs / 1000).toFixed(1)),
      answers: tasks.map((t) => ({
        id: t.id,
        text: t.text,
        correctAnswer: t.answer,
        given: answers[t.id]?.value ?? null,
        isCorrect: answers[t.id]?.isCorrect ?? false,
        sec: answers[t.id] ? Number((answers[t.id].ms / 1000).toFixed(1)) : null,
      })),
    };

    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `result-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="stats-wrap">
      <div className="stats">
        <div>Правильних відповідей: {correct} з {total}</div>
        <div>Краще ніж 80%</div>
        <div>Середній час відповіді: {(avgMs / 1000).toFixed(1)} с</div>
        <div>Краще ніж 70%</div>
      </div>
      <button className="download" onClick={download}>
        Завантажити результат
      </button>
    </div>
  );
}