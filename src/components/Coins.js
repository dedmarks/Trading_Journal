import React from 'react'
import '../styles/Coins.css'

function Coins({ image, name, symbol, price, volume, pricechange}) {
  return (
    <div className='coins__container'>
        <div className='coin__row'>
            <img src={image} alt="crypto"/>
            <h1 className='coin__name'>{name}</h1>
            <p className='coin__symbol'>{symbol}</p>
            <div className='coin__data'>
            <p className='coin__price'>{price}$</p>
            <p className='coin__volume'>{volume.toLocaleString()}$</p>
            {pricechange < 0 ? (
                <p className='coin__percent red1'>{pricechange.toFixed(2)}%</p>
            ) : 
            (<p className='coin__percent green1'>{pricechange.toFixed(2)}%</p>
            )}
        </div>
        </div>
    </div>
  )
}

export default Coins