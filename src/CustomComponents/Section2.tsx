import React from "react";
import { Box, Heading, Flex, Grid, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import parallaxBg from "../assets/BasketballBackground.jpg"; // Replace with actual image
import FlipParallaxCard from "./FlipParallaxCard/FlipParallaxCard";
import CardQueue from "./RunningStackedCards/RunningStackedCards";

const MotionBox = motion(Box);

const Section2: React.FC = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [200, 1200], ["0%", "-50%"]); // Adjust for stronger effect

  return (
    <Box position="relative" height="100vh" overflow="hidden">
      {/* Background Image with Parallax Effect */}
      <MotionBox
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="200%"
        backgroundImage={`url(${parallaxBg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        style={{ y: backgroundY }}
      />

      {/* Foreground Content */}
      <Flex
        position="relative"
        height="100vh"
        justify="space-between"
        align="center"
        bg="rgba(0, 0, 0, 0.5)" // Semi-transparent overlay
        padding={24}
      >
        <Box>
          <CardQueue />
          <Heading color="white" fontSize="4xl">
            Take a look at our latest collection
          </Heading>
          <Text color="yellow">
            **These product cards on the right are made and animated using css
            only.**
          </Text>
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={12}>
          <FlipParallaxCard title="Sneaker 1" description="Description 1" />

          <FlipParallaxCard title="Sneaker 1" description="Description 1" />
          <FlipParallaxCard title="Sneaker 1" description="Description 1" />
          <FlipParallaxCard title="Sneaker 1" description="Description 1" />
        </Grid>
      </Flex>
    </Box>
  );
};

export default Section2;
