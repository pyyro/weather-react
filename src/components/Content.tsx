import {
  Icon,
  Image,
  Box,
  Text,
  HStack,
  Avatar,
  Flex,
  Spacer,
  Grid,
} from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import DailyWeatherCard from "./DailyWeatherCard";
import TodayCard from "./TodayCard";

interface DailyWeather {
  day: number;
  temp: number;
  weatherType: string;
}

interface WeatherData {
  dt: number;
  cityName: string;
  timezone: string,
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
};

const Content: FC<Props> = ({ weatherData }) => {
  var weekDay: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <Box w="80%" background="#F3F2F2">
      <HStack w="98%">
        <HStack spacing={10}>
          <Text as="span" _hover={{ color: "blue.400" }}>
            Today
          </Text>
          <Text as="span" _hover={{ color: "blue.400" }}>
            Week
          </Text>
        </HStack>

        <Spacer />
        <HStack spacing={8}>
          <HStack spacing={4}>
            <Text
              bg="gray.400"
              p={2}
              borderRadius="50%"
              color="white"
              _hover={{ bg: "blue.500" }}
            >
              °C
            </Text>

            <Text
              p={2}
              borderRadius="50%"
              bg="gray.400"
              color="white"
              _hover={{ bg: "blue.500" }}
            >
              °F
            </Text>
          </HStack>
        </HStack>
      </HStack>

      <Flex alignItems="center" mt={4}>
        {weatherData?.daily.slice(0, 7).map((_daily) => {
          return (
            <DailyWeatherCard
              key={_daily.day}
              day={weekDay[_daily?.day]}
              weatherImg="/assets/cloudy.svg"
              temp={(_daily?.temp - 275).toFixed(1)}
            />
          );
        })}
      </Flex>

      <Text mt={10} mb={4}>
        Today's Highlight
      </Text>

      <Grid templateColumns="repeat(3, 1fr)" gap={4} w="99%">
        {/* sunrise/sunset card */}
        <Box bg="white" borderRadius="10px">
          <Text m="4" color="gray.500" fontWeight="bold">
            Sunrise and Sunset
          </Text>
          <HStack p="4">
            <Image src="/assets/sunrise.svg" w="10" h="10" />
            <Text>
              {new Date(weatherData?.sunrise! * 1000).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Text>
          </HStack>

          <HStack p="4">
            <Image src="/assets/sunset.svg" w="10" h="10" />
            <Text>
              {new Date(weatherData?.sunset! * 1000).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Text>
          </HStack>
        </Box>
        {/* sunrise/sunset card end */}

        {/* temperature card */}

        <Box bg="white" borderRadius="10px">
          <Text m="4" color="gray.500" fontWeight="bold">
            Temperature
          </Text>
          <HStack p="4">
            <Box width="100%">
              <Text as="span" fontSize="4xl">
                {(weatherData?.currentTemp! - 275).toFixed(1)}
              </Text>
              <Text as="span" color="gray.400">
                {" "}
                °c
              </Text>

              <Box mt="12"></Box>
              <Icon as={GoLocation} />
              <Text as="span" color="gray.600" ml="0.5">
                {weatherData?.cityName}
              </Text>
            </Box>
            <Image src="../../assets/temprature.svg" h="32" />
          </HStack>
        </Box>

        {/* temperature card */}

        <TodayCard
          title="Wind Status"
          value={weatherData?.wind!}
          unit="km/h"
          statusProperty="Status: "
          statusValue=""
          statusValueColor=""
          ballColor="yellow"
          ballPosValue={6}
        />

        <TodayCard
          title="Humidity"
          value={weatherData?.humidity!}
          unit="%"
          statusProperty="Status: "
          statusValue="Good Quality"
          statusValueColor="blue.500"
          ballColor="blue"
          ballPosValue={4}
        />

        <TodayCard
          title="Visibility"
          value={weatherData?.visibility!}
          unit=""
          statusProperty="Status: "
          statusValue="Average"
          statusValueColor="yellow.500"
          ballColor="green"
          ballPosValue={14}
        />

        <TodayCard
          title="Air Quality"
          value={120}
          unit=""
          statusProperty="Status: "
          statusValue="Bad Quality"
          statusValueColor="red.500"
          ballColor="red"
          ballPosValue={24}
        />
      </Grid>
    </Box>
  );
};

export default Content;
