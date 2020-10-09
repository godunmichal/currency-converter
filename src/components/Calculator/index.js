import React,{useState, useEffect} from 'react'
import Select from '../Select';
import axios from 'axios';
import './Calculator.css'
import {sortData} from '../util'
import {RiArrowUpDownLine} from 'react-icons/ri'

function Calculator() {

    const [result,setResult] = useState("0.00");
    const [amount,setAmount] = useState(0);
    const [currencyFrom, setCurrencyFrom] = useState('PLN');
    const [currencyTo, setCurrencyTo] = useState('EUR');
    const [currencies, setCurrencies] = useState([]);


    useEffect(() => {
        const url=`https://api.ratesapi.io/api/latest?base=PLN`;
        axios.get(url)
            .then(response =>{
                let sortedData = sortData(Object.keys(response.data.rates));
                setCurrencies(sortedData)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const amountChange = (e) =>{
        setAmount(e.target.value)
    }


    const handleSubmit = (e) =>{
        e.preventDefault()
        const url=`https://api.ratesapi.io/api/latest?base=${currencyFrom}`;
        axios.get(url)
            .then(response =>{
                setResult((amount*response.data.rates[currencyTo]).toFixed(2))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const changeCurrencies =()=>{
        setCurrencyFrom(currencyTo)
        setCurrencyTo(currencyFrom)
    }

    return (
        <form className="calculator" onSubmit={handleSubmit}>
            <div className="input">
                <span>Amount: </span>
            <input className="custom-input" type='number' onChange={amountChange}/>
            </div>
            <div className="select_from">
                <Select value={currencyFrom} setCurrency={setCurrencyFrom} currencies={currencies} label="From currency: "/>
            </div>
            <button className='change-button' onClick={changeCurrencies}>Change currency<RiArrowUpDownLine/></button>
            <div className="select_to">
                <Select value={currencyTo} setCurrency={setCurrencyTo} currencies={currencies} label="To currency: "/>
            </div>
            <div className="result">
                <span>Result: </span> {result}
            </div>
            <button className='custom-button' type='submit'>
                Calculate
            </button>
        </form>
    )
}

export default Calculator
