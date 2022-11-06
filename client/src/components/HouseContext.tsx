import React, { useState, useEffect, createContext, FC } from 'react';

import { housesData } from '../data';



export const HouseContext = createContext({});

const HouseContextProvider = ({ children }: any) => {
    const [houses, setHouses] = useState(housesData);
    const [city, setCity] = useState('Расположение (любое)');
    const [cities, setCities] = useState([]);
    const [property, setProperty] = useState('Property type (any)');
    const [properties, setProperties] = useState([]);
    const [price, setPrice] = useState('Price range (any)');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const allCities = houses.map((house) => {
            return house.country;
        }).filter((value, index, self) => self.indexOf(value) === index);
        const uniqueCities : any = ['Все города', ...allCities];
        setCities(uniqueCities);
    }, []);

    return <HouseContext.Provider value={{
        city,
        setCity,
        cities,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading
    }}>
      {children}
  </HouseContext.Provider>
}

export default HouseContextProvider;