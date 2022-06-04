import {
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
  Image,
  Box,
  Text,
  Divider,
  Stack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";

interface DailyWeather {
  day: number;
  temp: number;
  weatherType: string;
}

interface WeatherData {
  dt: number;
  cityName: string;
  currentTemp: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  visibility: number;
  wind: number;
  daily: DailyWeather[];
}

type Props = {
  weatherData: WeatherData | null;
  setCityToGetData: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar: FC<Props> = ({ weatherData, setCityToGetData }) => {
  var weekDay: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const handleChange = (e:React.KeyboardEvent) => {
  //   if(e.key==='Enter'){
  //     let target = e.target as HTMLInputElement
  //     setCityToGetData(target.value)
  //   }

  const handleChange = (e: any) => {
    if (e.key === "Enter") {
      setCityToGetData(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <Box w="20%" h="100vh" background="white">
      <Box w="90%" ml="4">
        <Box mt="4" w="95%">
          <InputGroup>
            <InputLeftElement children={<Icon as={AiOutlineSearch} />} />
            <Input
              placeholder="Search Place"
              bg="gray.200"
              onKeyDown={handleChange}
            />
          </InputGroup>
        </Box>

        <Image src="../../assets/cloudy.svg" />

        <Box>
          <Text fontSize="6xl" color="blue.500">
            {(weatherData?.currentTemp! - 275).toFixed(1)} °C
          </Text>
        </Box>

        <Box>
          <Text as="span" fontSize="4xl">
            {weekDay[new Date(weatherData?.dt! * 1000).getDay()]}
          </Text>
          <Text fontSize="4xl" color="gray.400">
            {new Date(weatherData?.dt! * 1000).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>
        </Box>

        <Divider />

        {/* <Box mt="6" mb="6">
          <Stack direction={["column", "row"]} spacing="24px">
            <Image src="../../assets/cloudy.svg" boxSize="50px" />
            <Text fontSize="2xl" color="gray.400">
              Mostly Cloudy
            </Text>
          </Stack>

          <Stack direction={["column", "row"]} spacing="24px">
            <Image src="../../assets/rainny.svg" boxSize="50px" />
            <Text fontSize="2xl" color="gray.400">
              Rain - 30%
            </Text>
          </Stack>
        </Box> */}

        <Box height="64" mt={10}>
          <Icon as={IoLocation} w="8" h="8" />
          <Text as="span" fontSize="4xl">
            {weatherData?.cityName}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
