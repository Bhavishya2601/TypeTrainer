interface ResultProps {
  wpm: number;
  accuracy: number;
  restartTest: () => void;
}

export default function Result({ wpm, accuracy, restartTest }: ResultProps) {
  return (
    <div className="text-center">
      <div className="text-xl font-semibold mb-2">✅ Test Complete</div>
      <p className="mb-1">
        WPM: <strong>{isNaN(wpm) ? 0 : wpm}</strong>
      </p>
      <p>
        Accuracy: <strong>{accuracy}%</strong>
      </p>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={restartTest}
      >
        Restart Test
      </button>
    </div>
  );
}
