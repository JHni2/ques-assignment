'use client';
import { weatherDescKo } from '@/const/weatherDescKo';
import { week } from '@/const/week';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Title from './Title';
import MapIcon from './ui/icons/MapIcon';

type WeatherProps = {
  lat: number;
  lon: number;
};

export default function Weather() {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const initialValue = { description: '', name: '', temp: 0, icon: '' };
  const [weather, setWeather] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const date = new Date();
  const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일 ${week[date.getDay()]}요일`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather({ lat, lon });
      setLoading(true);
    });
  }, []);

  const getWeather = async ({ lat, lon }: WeatherProps) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const weatherId = res.data.weather[0].id;
      const cityName = res.data.name;
      const weatherKo = weatherDescKo[weatherId];
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      const temp = Math.round(res.data.main.temp);

      setWeather({
        description: weatherKo,
        name: cityName.slice(0, -3),
        temp: temp,
        icon: weatherIconAdrs,
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="weather mb-12">
      <Title en="Weather" kr="오늘 날씨" />
      <div className="flex justify-center">
        <div className="w-full flex flex-col items-center px-16 py-4 rounded-3xl shadow-md">
          <time dateTime={formattedDate} suppressHydrationWarning>
            {formattedDate}
          </time>
          {/* <span>{formattedDate}</span> */}
          {loading ? (
            <div className="min-h-[175px] min-w-[165px]"></div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <MapIcon size={22} />
                <span className="text-lg font-bold">{weather.name}</span>
              </div>
              <div className="flex flex-col items-center">
                {weather.icon && <Image src={weather.icon} alt="weather icon" width={100} height={100} priority />}
                <p className="font-bold">
                  <span>{weather.temp}</span>°C
                </p>
                <span>{weather.description}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
