export default function TaskCard({ topicTitle, text }) {
  return (
    <div className="task">
      <h2 className="task-title">{topicTitle}</h2>
      <p className="task-text">{text}</p>
    </div>
  );
}