import { useState } from "react";

interface WordsBarProps {
  onSelectCnt: (value: number) => void;
  onSelectTimer: (value: number) => void;
  disabled: boolean;
}

export default function WordTimeBar({
  onSelectCnt,
  onSelectTimer,
  disabled,
}: WordsBarProps) {
  const [selectedValueCnt, setSelectedValueCnt] = useState<number | null>(45);
  const [selectedValueTimer, setSelectedValueTimer] = useState<number | null>(
    60,
  );

  const handleClickCnt = (value: number) => {
    if (disabled) return;
    setSelectedValueCnt(value);
    onSelectCnt(value);
  };

  const handleClickTimer = (value: number) => {
    if (disabled) return;
    setSelectedValueTimer(value);
    onSelectTimer(value);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-1 items-center">
        <div>Time: </div>
        <div className="flex items-center">
          {[30, 60, 90, 120].map((num) => (
            <div
              key={num}
              onClick={() => handleClickTimer(num)}
              aria-disabled={disabled}
              className={`px-2 py-1 hover:bg-gray-900 ${disabled ? `cursor-not-allowed` : `cursor-pointer`} bg-gray-800 ${selectedValueTimer === num ? "bg-gray-900" : ""}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <div>Word Count: </div>
        <div className="flex items-center">
          {[15, 30, 45, 60].map((num) => (
            <div
              key={num}
              onClick={() => handleClickCnt(num)}
              className={`px-2 py-1 hover:bg-gray-900 ${disabled ? `cursor-not-allowed` : `cursor-pointer`} bg-gray-800 ${selectedValueCnt === num ? "bg-gray-900" : ""}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
