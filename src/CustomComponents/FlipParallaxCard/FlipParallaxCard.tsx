import React, { use } from "react";
import { Box, Image, Text, Stack, Button } from "@chakra-ui/react";
import imageBackground from "../../assets/shoes-1.png";
import "./FlipParallaxCard.scss";
import { useColorModeValue } from "../../components/ui/color-mode";

interface CardProps {
  image?: string;
  title: string;
  description: string;
}

const FlipParallaxCard: React.FC<CardProps> = ({
  image = imageBackground,
  title,
  description,
}) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Box maxW="sm" borderRadius="lg" className="main-container">
      {/* <Image src={image} alt={title} />

      <Box p="6">
        <Stack>
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <Text>{description}</Text>
        </Stack>
      </Box> */}
      <Box className="container">
        <Box className="front" bg={bgColor}>
          <Image
            className="product-image"
            src={image}
            alt={title}
            objectFit="cover"
          />
        </Box>

        <Box className="back">
          <Button className="inner">View More</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FlipParallaxCard;
