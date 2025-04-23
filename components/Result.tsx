interface ResultProps {
  wpm: number;
  accuracy: number;
  restartTest: () => void;
}

export default function Result({ wpm, accuracy, restartTest }: ResultProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <div className="flex items-center justify-between sm:flex-row flex-col gap-5 sm:w-lg lg:w-3xl">
        <div className="text-3xl lg:text-5xl font-bold">
          Accuracy: <strong>{accuracy}%</strong>
        </div>
        <div className="text-3xl lg:text-5xl font-bold">
          WPM: <strong>{isNaN(wpm) ? 0 : wpm}</strong>
        </div>
      </div>

      <button
        className="mt-4 px-4 py-2 text-xl bg-transparent border-2 border-white text-white hover:bg-gray-800 cursor-pointer"
        onClick={restartTest}
      >
        Restart Test
      </button>
    </div>
  );
}
