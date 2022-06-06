import {
  List,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
  Image,
  Box,
  Text,
  Divider,
  VStack,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import React, { FC, useRef, useState } from "react";
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
  timezone: string;
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
  const [cityList, setCityList] = useState<string[]>([]);
  const searchInputRef:any = useRef();

  const getCitiesFromSearch = async (cityQuery: string) => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&limit=3&appid=${process.env.REACT_APP_API_KEY}`;
    let response = await axios.get(url);
    let result = await response.data;
    console.log(result);
    let _cityList: string[] = [];
    result.forEach((item: any) => {
      _cityList.push(item.name);
      console.log(item.name);
    });
    setCityList(_cityList);
  };

  var weekDay: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  const handleSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
      let target = e.target as HTMLInputElement;
      if(!target.value){
        setCityList([]);
      }
      getCitiesFromSearch(target.value);
  }

  const handleListClick = (cityListItem:string):any => {
    searchInputRef.current.value="";
    setCityToGetData(cityListItem); 
    setCityList([]);
  }

  return (
    <Box w="20%" h="100vh" background="white">
      <Box w="90%" ml="4">
        <VStack mt="4" w="95%">
          <InputGroup>
            <InputLeftElement children={<Icon as={AiOutlineSearch} />} />
            <Input
              placeholder="Search Place"
              bg="gray.200"
              onKeyDown={handleSearch}
              ref={searchInputRef}
            />
          </InputGroup>
          <List border="1px" borderColor="blue.400" borderRadius={4}>
            {cityList.map((cityListItem: string) => (
              <ListItem
                bg="gray.300"
                width="80"
                textAlign="center"
                lineHeight={2}
                onClick={()=>handleListClick(cityListItem)}
                cursor="pointer"
                _hover={{
                  bg: "gray.100"
                }}
              >
                {cityListItem}
              </ListItem>
            ))}
          </List>
        </VStack>

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
              timeZone: weatherData?.timezone,
            })}
          </Text>
        </Box>

        <Divider />


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
