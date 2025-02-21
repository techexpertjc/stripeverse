import React, { useState } from "react";
import { Box, Image, Button, Spacer } from "@chakra-ui/react";
import shoeImage from "../../assets/shoes-1.png";
import { useColorModeValue } from "../../components/ui/color-mode";
import Tilt from "react-parallax-tilt";
import "./ProductCard.scss";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const ProductCard: React.FC = () => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      className="invisible-div"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      zIndex={10}
    >
      <MotionBox
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        height="400px"
        width="300px"
        bg={bgColor}
        position={"relative"}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <MotionBox
          zIndex={1}
          position={"absolute"}
          h={"100%"}
          // transform={"rotateY(180deg)"}
          w={"100%"}
          alignContent={"center"}
          // perspective={1000}
          animate={{
            display: isFlipped ? "block" : "none",
            rotateY: 180,
          }}
          transition={{ duration: isFlipped ? 0.5 : 0.1 }}
        >
          <Button className="inner-element">See More</Button>
        </MotionBox>

        <MotionBox
          zIndex={2}
          position={"absolute"}
          h={"100%"}
          w={"100%"}
          animate={{
            display: isFlipped ? "none" : "block",
            rotateY: 0,
          }}
          transition={{ duration: isFlipped ? 0.1 : 0.5 }}
        >
          <Image src={shoeImage} objectFit="contain" h={"100%"} w="100%" />
        </MotionBox>
      </MotionBox>
    </Box>
  );
};

export default ProductCard;
