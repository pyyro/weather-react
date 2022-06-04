import { Box, Image, Spacer, Text } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  day: string;
  weatherImg: string;
  temp: string;
}

const DailyWeatherCard: FC<Props> = ({ day, weatherImg, temp }) => {
  return (
    <>
      <Box
        bg="white"
        borderRadius="10px"
        textAlign="center"
        background="#FFFEFF"
        width="12%"
        _hover={{
          bg: "#75C1FC",
          color: "white",
        }}
      >
        <Box p="8">
          <Text>{day}</Text>
          <Image mt={6} src={weatherImg} />
          <Text mt={6}>{temp}°C</Text>
        </Box>
      </Box>
      <Spacer />
    </>
  );
};

export default DailyWeatherCard;
