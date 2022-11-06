import React, { useState, useEffect } from 'react'

import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Menu } from '@headlessui/react';
import { HouseContext } from './HouseContext';
import { useContext } from 'react';

const CityDropdown = () => {
    const { city, setCity, cities } : any = useContext(HouseContext);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Menu as='div' className='dropdown relative'>
            <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
                <RiMapPinLine className='dropdown-icon-primary' />
                <div>
                    <div className='text-[15px] font-medium leading-tight'>
                        {city}
                    </div>
                    <div className='text-[13px]'>Выберите город</div>
                </div>
                {isOpen ? (
                    <RiArrowUpSLine className='dropdown-icon-secondary' />) :
                    (<RiArrowDownSLine className='dropdown-icon-secondary' />)
                }
            </Menu.Button>
            <Menu.Items className='dropdown-menu'>
                {cities.map((city : any, index : any) => {
                    return (
                        <Menu.Item onClick={() => setCity(city)} className='cursor-pointer hover:text-violet-700 transition' as='li' key={index}>
                            {city}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}

export default CityDropdown