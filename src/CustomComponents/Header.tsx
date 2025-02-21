import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { ColorModeButton, DarkMode } from "../components/ui/color-mode";
import SneakerLogo from "./SneakerLogo";

const Header = () => {
  return (
    <DarkMode>
      <Box
        as="header"
        bg="secondary"
        px={6}
        py={0}
        mx={24}
        color="white"
        rounded={"lg"}
        shadow={"md"}
        position={"sticky"}
        top={5}
        zIndex={100}
      >
        <Flex align="center">
          {/* Logo */}
          <Flex fontSize="xl" fontWeight="bold" alignItems={"baseline"}>
            <SneakerLogo />{" "}
            <span
              style={{
                fontSize: 50,
              }}
            >
              S
            </span>
            trideVerse
          </Flex>

          <Spacer />

          {/* Navigation Links */}
          <Flex gap={6}>
            <Link href="#home" _hover={{ color: "primary" }}>
              Home
            </Link>
            <Link href="#shop" _hover={{ color: "primary" }}>
              Shop
            </Link>
            <Link href="#about" _hover={{ color: "primary" }}>
              About
            </Link>
            <Link href="#contact" _hover={{ color: "primary" }}>
              Contact
            </Link>
          </Flex>

          <Spacer />

          {/* Theme Toggle Button */}
          <ColorModeButton />
        </Flex>
      </Box>
    </DarkMode>
  );
};

export default Header;
