import React, { useState } from "react";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import shoesImage from "../assets/shoes-1.png";
import shoeInPhone from "../assets/shoeinphone.png";
import orangeshoe from "../assets/orangeshoe.png";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

const Section1: React.FC = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 15;
    const y = ((e.clientY - top) / height - 0.5) * 15;
    setRotate({ x: -y, y: x });
  };

  return (
    <MotionFlex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      height="100vh"
      padding="24"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{ perspective: "500px", transformStyle: "preserve-3d" }} // Apply perspective at the wrapper level
      position="relative" // Ensure the parent is positioned
      // Preserve 3D transformations
    >
      {/* Left Content */}
      <Box flex="1" textAlign={{ base: "center", md: "left" }}>
        <Heading as="h1" size="2xl" mb="4">
          Welcome to StrideVerse
        </Heading>
        <Text fontSize="lg">
          Discover the amazing world of StrideVerse, where you can explore and
          enjoy endless possibilities.
        </Text>
      </Box>

      {/* Right Content: Animated Image */}
      <MotionBox
        flex="1"
        display="flex"
        justifyContent="normal"
        // alignItems="center"
        position="relative" // Ensure images are positioned relative to this box
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transformStyle={"preserve-3d"}
      >
        {/* Orangeshoe - Animated Sneaker */}
        <MotionImage
          src={orangeshoe}
          initial={{ translateX: 100 }}
          animate={{ translateX: 500, translateY: -200, translateZ: -50 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          boxSize={{ base: "80%", md: "50%" }}
          zIndex={-1}
        />

        {/* Shoe Inside Phone - Ensure it stays inside properly */}
        <MotionImage
          src={shoeInPhone}
          alt="StrideVerse Sneakers in Phone"
          transform="translate(-50%, -50%)"
          height={{ base: "50%", md: "550px" }} // Consistent size
          objectFit="contain"
          animate={{ scale: 1 }}
          zIndex={1}
        />

        {/* Main Shoes Image */}
        <MotionImage
          src={shoesImage}
          alt="StrideVerse Sneakers"
          boxSize={{ base: "80%", md: "60%" }}
          objectFit="cover"
          animate={{
            translateY: 280,
            translateX: -600,
            scale: 0.7,
            translateZ: 60,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          zIndex={2}
        />
      </MotionBox>
    </MotionFlex>
  );
};

export default Section1;
