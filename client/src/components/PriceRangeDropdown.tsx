import React, { useState, useEffect } from 'react'

import { RiWallet3Line, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Menu } from '@headlessui/react';
import { HouseContext } from './HouseContext';
import { useContext } from 'react';

const PriceRangeDropdown = () => {
    const { price, setPrice } : any = useContext(HouseContext);
    const [isOpen, setIsOpen] = useState(false);

    const prices = [
        {
            value: 'Цена (любая)'
        },
        {
            value: '20000 - 30000'
        },
        {
            value: '30000 - 40000'
        },
        {
            value: '40000 - 50000'
        },
        {
            value: '50000 - 60000'
        },
        {
            value: '60000 - 70000'
        },
        {
            value: '70000 - 80000'
        },

    ]
    return (
        <Menu as='div' className='dropdown relative'>
            <Menu.Button onClick={() => setIsOpen(!isOpen)} className='dropdown-btn w-full text-left'>
                <RiWallet3Line className='dropdown-icon-primary' />
                <div>
                    <div className='text-[15px] font-medium leading-tight'>
                        {price}
                    </div>
                    <div className='text-[12px]'>Выберите диапазон</div>
                </div>
                {isOpen ? (
                    <RiArrowUpSLine className='dropdown-icon-secondary' />) :
                    (<RiArrowDownSLine className='dropdown-icon-secondary' />)
                }
            </Menu.Button>
            <Menu.Items className='dropdown-menu'>
                {prices.map((price : any, index : any) => {
                    return (
                        <Menu.Item onClick={() => setPrice(price.value)} className='cursor-pointer hover:text-violet-700 transition' as='li' key={index}>
                            {price.value}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}

export default PriceRangeDropdown