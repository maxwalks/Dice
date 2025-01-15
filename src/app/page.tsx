"use client"
import { useState } from "react";
import Image from "next/image";

const imageList = [
  { number: 1, imagePath: "/dice-six-faces-one.svg" },
  { number: 2, imagePath: "/dice-six-faces-two.svg" },
  { number: 3, imagePath: "/dice-six-faces-three.svg" },
  { number: 4, imagePath: "/dice-six-faces-four.svg" },
  { number: 5, imagePath: "/dice-six-faces-five.svg" },
  { number: 6, imagePath: "/dice-six-faces-six.svg" }
];

export default function Home() {
  const [diceState, setDiceState] = useState<{ result: number | null; imagePath: string }>({
    result: null,
    imagePath: "/dice-six-faces-one.svg"
  })
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = () => {
    if (isRolling) return
    setIsRolling(true)
    const result = Math.floor(Math.random() * 6) + 1
    const newImage = imageList.find(img => img.number === result)?.imagePath || "/dice-six-faces-one.svg"
    setTimeout(() => {
      setDiceState({ result, imagePath: newImage })
      setIsRolling(false)
    }, 500)
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-slate-800">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-2xl font-bold text-slate-100">
            Roll the Dice
          </h1>
          <div className="bg-slate-800 rounded-xl p-8 w-full flex justify-center">
            <div className={`transform transition-transform duration-500 ${isRolling ? 'rotate-180' : ''}`}>
              <Image
                src={diceState.imagePath}
                alt="Dice"
                width={120}
                height={120}
                priority
                className="drop-shadow-lg"
              />
            </div>
          </div>
          <p className="text-lg font-medium text-slate-300 h-8">
            {diceState.result ? `You rolled: ${diceState.result}` : "Click to roll!"}
          </p>
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border border-indigo-500 hover:border-indigo-400"
          >
            {isRolling ? "Rolling..." : "Roll Dice"}
          </button>
        </div>
      </div>
    </div>
  );
}