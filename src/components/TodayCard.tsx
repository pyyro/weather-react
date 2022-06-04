import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  title: string;
  value: number;
  unit: string;
  statusProperty: string;
  statusValue: string;
  statusValueColor: string;
  ballColor: string;
  ballPosValue: number;
}

const TodayCard: FC<Props> = ({
  title,
  value,
  unit,
  statusProperty,
  statusValue,
  statusValueColor,
  ballColor,
  ballPosValue,
}) => {
  return (
    <Box bg="white" borderRadius="10px">
      <Text m="4" color="gray.500" fontWeight="bold">
        {title}
      </Text>
      <HStack p="4">
        <Box width="100%">
          <Text as="span" fontSize="4xl">
            {value}
          </Text>
          <Text as="span" color="gray.400">
            {unit}
          </Text>

          <Box mt="12"></Box>
          <Text as="span">{statusProperty}</Text>
          <Text as="span" color={statusValueColor}>
            {statusValue}
          </Text>
        </Box>

        <Box h="36" w="8" borderRadius="15px" bg="gray.300" position="relative">
          <Box
            h="6"
            w="6"
            ml="0.5"
            bg={`${ballColor}.500`}
            borderRadius="50%"
            position="absolute"
            top={ballPosValue}
          ></Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default TodayCard;
