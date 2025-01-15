"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

const imageList = [
  { number: 1, imagePath: "/dice-six-faces-one.svg" },
  { number: 2, imagePath: "/dice-six-faces-two.svg" },
  { number: 3, imagePath: "/dice-six-faces-three.svg" },
  { number: 4, imagePath: "/dice-six-faces-four.svg" },
  { number: 5, imagePath: "/dice-six-faces-five.svg" },
  { number: 6, imagePath: "/dice-six-faces-six.svg" }
]

export default function Home () {
  const [diceState, setDiceState] = useState<{ result: number | null; imagePath: string | null }>({
    result: null,
    imagePath: null
  })

  const rollDice = () => {
    const arr = [1, 2, 3, 4, 5, 6]
    const r = Math.floor(Math.random() * arr.length)
    const result = arr[r]
    const randomImage = imageList.find((img) => img.number == result)
    setDiceState({
      result: result,
      imagePath: randomImage ? randomImage.imagePath : null
    })
  }

  return (
    <div className="flex justify-center items-center h-[100vh] flex-col gap-4">
      <p className="text-2xl">{diceState.result ? `Dice face: ${diceState.result}` : "Please roll the dice!"}</p>
      <Image src={diceState.imagePath ?? "/dice-six-faces-one.svg"} alt="Dice image"  width={100} height={100} priority={true} />
      <Button onClick={rollDice}>Roll dice</Button>
    </div>
  )
}