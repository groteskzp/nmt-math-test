'use client';

import { useReducer } from 'react';
import TopicPicker from '@/components/TopicPicker';
import TaskCard from '@/components/TaskCard';
import Options from '@/components/Options';
import Stats from '@/components/Stats';
import { getTasks } from '@/lib/tasks';
import { getTopicTitle } from '@/lib/topics';
import  Timer from '@/components/Timer';

const initialState = {
  status: 'idle',
  tasks: [],
  index: 0,
  answers: {},
  selected: null,
  startedAt: null,
  askedAt: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      if (action.tasks.length === 0) return state;
      return {
        ...initialState,
        status: 'running',
        tasks: action.tasks,
        startedAt: Date.now(),
        askedAt: Date.now(),
      };

    case 'ANSWER': {
      if (state.selected !== null) return state;

      const task = state.tasks[state.index];

      return {
        ...state,
        selected: action.value,
        answers: {
          ...state.answers,
          [task.id]: {
            value: action.value,
            isCorrect: action.value === task.answer,
            ms: Date.now() - state.askedAt,
          },
        },
      };
    }

    case 'NEXT': {
      const next = state.index + 1;

      if (next >= state.tasks.length) {
        return { ...state, status: 'finished', selected: null };
      }

      return { ...state, index: next, selected: null, askedAt: Date.now() };
    }

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const task = state.tasks[state.index] ?? null;
  const isLast = state.index === state.tasks.length - 1;

  function handleStart(topicId, count) {
    dispatch({ type: 'START', tasks: getTasks(topicId, count) });
  }

  return (
    <main>
      <div className="picker-row">
        <TopicPicker
          onStart={handleStart}
          isRunning={state.status === 'running'}
        />
        <Timer
          startedAt={state.startedAt}
          total={state.tasks.length}
          frozen={state.status === 'finished'}
        />
      </div>

      <div className="progress">
        {task
          ? `Завдання ${state.index + 1} з ${state.tasks.length}`
          : '\u00A0'}
      </div>

      <div className="progress-bar">
        {state.tasks.map((t, i) => {
          const a = state.answers[t.id];
          let cls = 'segment';
          if (a) cls += a.isCorrect ? ' ok' : ' bad';
          else if (i === state.index) cls += ' current';
          return <div key={t.id} className={cls} />;
        })}
      </div>

      <TaskCard
        topicTitle={task ? getTopicTitle(task.topic) : 'Оберіть тему'}
        text={task ? task.text : 'Натисніть «Старт», щоб почати тест'}
      />

      <div className="feedback">{state.selected !== null && task.solution}</div>

      <Options
        options={task ? task.options : ['', '', '', '']}
        answer={task ? task.answer : null}
        selected={state.selected}
        onSelect={value => dispatch({ type: 'ANSWER', value })}
      />

      <div className="next">
        <button
          onClick={() => dispatch({ type: 'NEXT' })}
          disabled={state.selected === null || state.status !== 'running'}
        >
          {isLast ? 'Завершити' : 'Далі'}
        </button>
      </div>

      {state.status === 'finished' && (
        <Stats
          answers={state.answers}
          total={state.tasks.length}
          tasks={state.tasks}
        />
      )}
    </main>
  );
}
