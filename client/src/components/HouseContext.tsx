import React, { useState, useEffect, createContext, FC } from 'react';

import { housesData } from '../data';



export const HouseContext = createContext({});

const HouseContextProvider = ({ children }: any) => {
    const [houses, setHouses] = useState(housesData);
    const [city, setCity] = useState('Расположение (все)');
    const [cities, setCities] = useState([]);
    const [property, setProperty] = useState('Тип жилья (все)');
    const [properties, setProperties] = useState([]);
    const [price, setPrice] = useState('Цена (все)');
    const [loading, setLoading] = useState(false);
    /// cities
    useEffect(() => {
        const allCities = houses.map((house) => {
            return house.country;
        }).filter((value, index, self) => self.indexOf(value) === index);
        const uniqueCities : any = ['Все города', ...allCities];
        setCities(uniqueCities);
    }, []);
    /// properties
    useEffect(() => {
            const allProperties = houses.map((house) => {
                return house.type;
            }).filter((value, index, self) => self.indexOf(value) === index);
            const uniqueProperties : any = ['Любой тип', ...allProperties];
            setProperties(uniqueProperties);
    }, []);
    
    const handleClick = () => {
        setLoading(true);
        const isDefault = (str : any) => {
            return str.split(' ').includes('(все)');
        };

        const minPrice = parseInt(price.split(' ')[0]);
        const maxPrice = parseInt(price.split(' ')[2]);

        console.log(maxPrice);

        const newHouses = housesData.filter((house) => {
            const housePrice = parseInt(house.price);
            // all values are selected
            if (house.country === city &&
                house.type === property &&
                housePrice >= minPrice &&
                housePrice <= maxPrice) {
                return house;
            }
            // all values are default
            if (isDefault(city) && isDefault(property) && isDefault(price)) {
                return house;
            }
            // country is not default
            if (!isDefault(city) && isDefault(property) && isDefault(price)) {
                return house.country === city;
            }
            // property is not default
            if (!isDefault(property) && isDefault(city) && isDefault(price)) {
                return house.type === property;
            }
            // price is not default
            if (!isDefault(price) && isDefault(city) && isDefault(property)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house;
                }
            }
            // country and property is not default
            if (!isDefault(city) && !isDefault(property) && isDefault(price)) {
                return house.country === city && house.type === property;
            }
            // country and  price is not default
            if (!isDefault(city) && isDefault(property) && !isDefault(price)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.country === city;
                }
            }
            // property and price is not default
            if (isDefault(city) && !isDefault(property) && !isDefault(price)) {
                if (housePrice >= minPrice && housePrice <= maxPrice) {
                    return house.type === property;
                }
            }
        });

        setTimeout(() => {
            return (
                newHouses.length < 1 ? setHouses([]) :
                    setHouses(newHouses),
            setLoading(false)
            );
        }, 1000)
    }

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
        loading,
        handleClick,
    }}>
      {children}
  </HouseContext.Provider>
}

export default HouseContextProvider;