import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import Braga from '../../Images/Braga.png';
import Lisboa from '../../Images/Lisboa.png';
import Porto from '../../Images/Porto.png';
import Faro from '../../Images/Faro.png';

function Cards() {
    return (
        <div className='cards'>
            <h1>Available Cities</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src={Braga}
                            text='Braga'
                            label='Northern Portugal'
                            path='/cities/Braga'
                        />
                        <CardItem
                            src={Porto}
                            text='Porto'
                            label='Northern Portugal'
                            path='/cities/Porto'
                        />
                        <CardItem
                            src={Lisboa}
                            text='Lisboa'
                            label='Center Portugal'
                            path='/cities/Lisboa'
                        />
                        <CardItem
                            src={Faro}
                            text='Faro'
                            label='Southern Portugal'
                            path='/cities/Faro'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;