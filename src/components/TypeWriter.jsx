import { useState, useEffect } from "react";

export const TypewriterCycle = ({
  words = ["designer.", "photographer."],
  typingDelay = 100,
  erasingDelay = 50,
  delayBetween = 2000,
  className = "",
  cursorColor = "bg-blue-500",
  loop = true,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isWaiting) {
      const waitTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsTyping(false);
      }, delayBetween);
      return () => clearTimeout(waitTimeout);
    }

    if (isTyping) {
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingDelay);
        return () => clearTimeout(timeout);
      } else {
        setIsWaiting(true);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, erasingDelay);
        return () => clearTimeout(timeout);
      } else {
        const nextIndex = (currentWordIndex + 1) % words.length;
        if (loop || nextIndex !== 0) {
          setCurrentWordIndex(nextIndex);
          setIsTyping(true);
        }
      }
    }
  }, [
    currentText,
    isTyping,
    isWaiting,
    currentWordIndex,
    words,
    typingDelay,
    erasingDelay,
    delayBetween,
    loop,
  ]);

  return (
    <span className={className}>
      {currentText}
      <span
        className={`inline-block w-0.5 h-6 sm:h-8 md:h-10 ${cursorColor} ml-1 animate-pulse`}
      />
    </span>
  );
};
