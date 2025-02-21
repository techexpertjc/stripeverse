import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Image } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import shoes from "../../assets/BasketballBackground.jpg";
// Removed incorrect import statement

// Sample card data
interface Card {
  id: number;
  color: string;
  scatter?: boolean;
  angle?: number;
}

const MotionBox = motion(Box);

const initialCards: Card[] = [
  { id: 1, color: "#A89ABF" },
  { id: 2, color: "#1DA1F2" },
  { id: 3, color: "#FF0000" },
  { id: 4, color: "#333" },
  { id: 5, color: "#FF0050" },
  { id: 7, color: "#A89ABF" },
  { id: 8, color: "#1DA1F2" },
];

const CardQueue = () => {
  const [cards, setCards] = useState(initialCards);
  const [isPaused, setIsPaused] = useState(false);

  const removeCard = useCallback(() => {
    if (cards.length > 0) {
      setCards((prev) => prev.slice(0, -1));
    }
  }, [cards.length]);
  const scatterCards = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(true);
    setCards((prev) =>
      prev.map((card, index) => ({
        ...card,
        scatter: true,
        angle: (360 / prev.length) * index,
      }))
    );
  };

  const gatherCards = () => {
    setIsPaused(false);
    intervalRef.current = setInterval(() => {
      if (lastActionRef.current === "remove") {
        addCard();
        lastActionRef.current = "add";
      } else {
        removeCard();
        lastActionRef.current = "remove";
      }
    }, 1500);
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        scatter: false,
      }))
    );
  };

  const addCard = () => {
    setCards((prev) => {
      const newId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      return [{ id: newId, color: prev[2].color }, ...prev];
    });
  };

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActionRef = useRef<"add" | "remove">("remove");

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (lastActionRef.current === "remove") {
        addCard();
        lastActionRef.current = "add";
      } else {
        removeCard();
        lastActionRef.current = "remove";
      }
    }, 1500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [removeCard]);

  return (
    <Box
      position="relative"
      height="400px"
      width="300px"
      margin="auto"
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={scatterCards}
      onMouseLeave={gatherCards}
    >
      <AnimatePresence>
        {cards.map((card: Card, index) => (
          <MotionBox
            key={card.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              //   y: index * 20,
              //   x: -index * 20,
              translateZ: index * 20,
              //   rotate: card.scatter ? card.angle : 0,
              x: card.scatter
                ? 300 * Math.cos((card.angle * Math.PI) / 180)
                : -index * 20,
              y: card.scatter
                ? 300 * Math.sin((card.angle * Math.PI) / 180)
                : index * 20,
              //   scale: 1 - index * 0.05,
            }}
            exit={{ opacity: 0, y: +index * 20 + 50, x: -150, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            padding={4}
            style={{
              position: "absolute",
              width: "100%",
              height: "150px",
              backgroundColor: card.color,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <Image src={shoes} height={"90%"} />
          </MotionBox>
        ))}
        <Button
          style={{
            transform: isPaused
              ? "translateY(50px)"
              : "translateZ(200px) translateY(175px) translateX(-150px)",
          }}
          //   onClick={removeCard}
          mt={4}
        >
          Take me to Store
        </Button>
      </AnimatePresence>
    </Box>
  );
};

export default CardQueue;
