import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import Braga from './Braga.png';
import Lisboa from './Lisboa.png';

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
                            path='/braga'
                        />
                        <CardItem
                            src={Lisboa}
                            text='Lisboa'
                            label='Center Portugal'
                            path='/lisboa'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;