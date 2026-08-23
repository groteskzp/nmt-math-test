export default function Options({ options, answer, selected, onSelect }) {
  return (
    <div className="options">
      {options.map((option, i) => {
        let cls = 'option';
if (answer === null) cls += ' empty';
if (selected !== null) {
  if (option === answer) cls += ' correct';
  else if (option === selected) cls += ' wrong';

        }
        return (
          <button
            key={i}
            className={cls}
            disabled={selected !== null || answer === null}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}