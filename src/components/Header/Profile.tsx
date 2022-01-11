import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align={"center"}>
      <Box mr={"4"} textAlign={"right"}>
        <Text>Augusto Souza</Text>
        <Text color={"gray.300"} fontSize={"small"}>
          augusto.souza@gmail.com
        </Text>
      </Box>

      <Avatar
        size={"md"}
        name="Augusto Souza"
        src="https://github.com/augustojs1"
      />
    </Flex>
  );
}
