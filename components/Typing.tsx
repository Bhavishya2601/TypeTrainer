"use client";

import React, { useEffect, useState } from "react";
import { generate } from "random-words";
import clsx from "clsx";
import Result from "./Result";
import WordsBar from "./WordTimeBar";

export default function Typing() {
  const [words, setWords] = useState<string[]>([]);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [testDuration, setTestDuration] = useState(60);
  const [wordsCount, setWordsCount] = useState(45);

  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isRunning = startTime !== null && !isFinished;

  const handleWordCnt = (value: number) => {
    setWordsCount(value);
  };

  const handleTestDuration = (value: number) => {
    setTestDuration(value);
    setTimeLeft(value);
  };

  useEffect(() => {
    setIsClient(true);
    setWords(generate(wordsCount) as string[]);
  }, [wordsCount]);

  useEffect(() => {
    if (!startTime || isFinished) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;
      if (!startTime) {
        setStartTime(Date.now());
        setTimeLeft(testDuration);
      }

      if (e.key === "Backspace") {
        setCurrentWord((prev) => prev.slice(0, -1));
      } else if (e.key === " " || e.key === "Enter") {
        const newTypedWords = [...typedWords, currentWord];
        setTypedWords(newTypedWords);
        setCurrentWord("");

        const newActiveIndex = activeIndex + 1;
        setActiveIndex(newActiveIndex);

        if (newActiveIndex >= words.length) {
          finishTest();
        }
      } else if (e.key.length === 1) {
        setCurrentWord((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentWord,
    isFinished,
    startTime,
    isClient,
    testDuration,
    typedWords,
    activeIndex,
    words.length,
  ]);

  const finishTest = () => {
    setIsFinished(true);
  };

  const restartTest = () => {
    setWords(generate(wordsCount) as string[]);
    setTypedWords([]);
    setCurrentWord("");
    setActiveIndex(0);
    setTimeLeft(testDuration);
    setStartTime(null);
    setIsFinished(false);
  };

  // logic for result calculation
  let correctChars = 0;
  typedWords.forEach((typedWord, index) => {
    const originalWord = words[index] || "";
    for (let i = 0; i < typedWord.length; i++) {
      if (typedWord[i] === originalWord[i]) {
        correctChars++;
      }
    }
  });

  let correctWords = 0;
  const mistypedWords = new Set<number>();

  typedWords.forEach((typedWord, index) => {
    const originalWord = words[index] || "";

    if (typedWord !== originalWord) {
      mistypedWords.add(index);
    } else {
      correctWords++;
    }
  });

  const totalTypedWords = typedWords.length;
  const minutes = (testDuration - timeLeft) / 60;
  const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;
  const accuracy =
    totalTypedWords === 0
      ? 0
      : Math.round((correctWords / totalTypedWords) * 100);

  if (!isClient) {
    return (
      <main className="min-h-[calc(100vh-104px)] flex flex-col gap-3 items-center justify-center p-6 bg-gray-900 text-white">
        <div className="flex flex-col gap-3">
          <div className="flex justify-start w-full text-yellow-500 max-w-6xl text-2xl">
            <span className="font-bold">{testDuration}</span>
          </div>
          <div className="max-w-6xl text-3xl leading-12 font-roboto mb-6 text-wrap break-words">
            <span className="text-gray-500">Loading...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-104px)] flex flex-col gap-3 items-center justify-center p-6 bg-gray-900 text-white">
      {!isFinished && (
        <div className="flex flex-col gap-3">
          <WordsBar
            onSelectCnt={handleWordCnt}
            onSelectTimer={handleTestDuration}
            disabled={isRunning}
          />
          <div className="flex justify-start w-full text-yellow-500 max-w-6xl text-2xl">
            <span className="font-bold">{timeLeft}</span>
          </div>

          <div className="max-w-6xl text-2xl sm:text-3xl leading-12 font-roboto mb-6 text-wrap break-words">
            {words.map((word, index) => {
              const isActive = index === activeIndex;
              const typedWord =
                index < typedWords.length
                  ? typedWords[index]
                  : isActive
                    ? currentWord
                    : "";

              return (
                <span key={index} className="inline-block mr-2">
                  {Array.from({
                    length: Math.max(word.length, typedWord.length),
                  }).map((_, charIndex) => {
                    const char = word[charIndex] || "";
                    const typedChar = typedWord[charIndex];
                    const isCorrect = typedChar === char;

                    let className = "text-gray-500";
                    if (typedChar != null) {
                      className = isCorrect ? "text-white" : "text-red-400";
                    }

                    if (isActive && charIndex === currentWord.length) {
                      className += " underline decoration-yellow-500";
                    }

                    return (
                      <span key={charIndex} className={clsx(className)}>
                        {typedChar !== undefined ? typedChar : char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {isFinished && (
        <Result wpm={wpm} accuracy={accuracy} restartTest={restartTest} />
      )}
    </main>
  );
}
