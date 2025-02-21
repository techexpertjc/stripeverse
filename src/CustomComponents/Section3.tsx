import React from "react";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import verticalShoeLegs from "../assets/legshoevertical.png";
import { motion, useScroll, useTransform } from "framer-motion";
import shoes from "../assets/orangeshoe.png";
import Tilt from "react-parallax-tilt";

const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);
const Section3: React.FC = () => {
  const { scrollY } = useScroll();
  console.log("scrollY: ", scrollY);
  const backgroundY = useTransform(scrollY, [1000, 2000], ["-80%", "0%"]);
  console.log("backgroundY: ", backgroundY);
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] =
    React.useState(false);
  console.log("isInitialAnimationComplete: ", isInitialAnimationComplete);
  const [selectedColor, setSelectedColor] = React.useState("red");

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setSelectedColor(color);
  };
  const colorFilters: Record<string, string> = {
    red: "hue-rotate(0deg) saturate(200%) brightness(1.2)",
    blue: "hue-rotate(200deg) saturate(200%) brightness(1.2)",
    green: "hue-rotate(100deg) saturate(200%) brightness(1.2)",
  };
  return (
    <Box position="relative" height="100vh" overflow="hidden">
      <MotionBox
        // backgroundImage={`url(${verticalShoeLegs})`}
        position="relative"
        top="0"
        left="0"
        width="100%"
        height="150%"
        backgroundPosition="left"
        backgroundRepeat={"no-repeat"}
        // style={{ y: backgroundY }}
      >
        <MotionImage
          src={verticalShoeLegs}
          position="absolute"
          left="0%"
          style={{ y: backgroundY }}
          animate={{
            rotateZ: [15, -15, 15],
          }}
          transformOrigin={"top"}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          zIndex={1}
        />
        <Flex
          padding={24}
          justify="space-around"
          align="center"
          minHeight="70%"
          position={"relative"}
          zIndex={2}
        >
          <Heading fontSize="4xl">
            Available in all sizes and Colors
            <br />
            <span
              style={{
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => setSelectedColor("red")}
            >
              Red.{" "}
            </span>
            <span
              style={{
                cursor: "pointer",
                color: "blue",
              }}
              onClick={() => setSelectedColor("blue")}
            >
              Blue.{" "}
            </span>
            <span
              style={{
                cursor: "pointer",
                color: "green",
              }}
              onClick={() => setSelectedColor("green")}
            >
              Green.{" "}
            </span>
            <Text fontSize={12} color="yellow">
              **Try clicking the colors**
            </Text>
          </Heading>
          <Tilt>
            <MotionBox
              position="relative"
              marginTop={24}
              height={50}
              // animate={{
              //   rotateZ: isInitialAnimationComplete
              //     ? [0, 45, 90, 135, 180, 225, 270, 315, 360]
              //     : 0,
              // }}
              // transformOrigin={}
              // transition={{
              //   duration: 5,
              //   repeat: Infinity,
              //   repeatType: "loop",
              // }}
              style={{
                perspective: 1000,
                perspectiveOrigin: "50% 50%",
                transformStyle: "preserve-3d",
                // rotateY: 180,
              }}
            >
              <Box
                height="300px"
                width="300px"
                position="absolute"
                top={-225}
                left={-350}
                style={{
                  filter: colorFilters[selectedColor], // Apply dynamic filter
                  transition: "filter 0.3s ease-in-out",
                  transform: "translateZ(50)",
                }}
              >
                <Image src={shoes} />
              </Box>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                <MotionFlex
                  key={item + `${isInitialAnimationComplete}`}
                  width={200}
                  height={50}
                  transformOrigin={"top left"}
                  position={"absolute"}
                  top={-20}
                  right={0}
                  justifyContent={"end"}
                  viewport={{ once: true, amount: "all" }}
                  style={{
                    filter: colorFilters[selectedColor], // Apply dynamic filter
                    transition: "filter 0.3s ease-in-out",
                  }}
                  whileInView={{
                    rotateZ: i * 45,
                  }}
                  transition={
                    isInitialAnimationComplete
                      ? { duration: 5, repeat: Infinity, repeatType: "reverse" }
                      : { duration: i * 1 }
                  }
                  onAnimationComplete={() => {
                    if (i === 7) {
                      setIsInitialAnimationComplete(true);
                    }
                  }}
                  animate={
                    isInitialAnimationComplete
                      ? {
                          rotateZ: [
                            i * 45 - 45,
                            i * 45 - 90,
                            i * 45 - 135,
                            i * 45 - 180,
                            i * 45 - 225,
                            i * 45 - 270,
                            i * 45 - 315,
                            i * 45 - 360,
                            i * 45 - 45,
                          ],
                        }
                      : {}
                  }
                >
                  {/* <Box
                  position="absolute"
                  top={0}
                  left="50%"
                  transform="translateX(-50%)"
                  w="100%"
                  h="100%"
                  bg={selectedColor}
                  mixBlendMode="multiply" // Blends color with image
                  opacity={0.7}
                  zIndex={2}
                /> */}
                  <Image src={shoes} height="100%" />
                </MotionFlex>
              ))}
            </MotionBox>
          </Tilt>
        </Flex>
      </MotionBox>
    </Box>
  );
};

export default Section3;
