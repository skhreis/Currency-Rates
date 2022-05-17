import './App.css';
import Select from 'react-select'
import {useState, useEffect} from "react"
import currencyData from './mockData/currencyData';
// import Currday1 from './mockData/Currday1';
// import Currday2 from './mockData/Currday2';
// import Currday3 from './mockData/Currday3';
// import Currday4 from './mockData/Currday4';
// import Currday5 from './mockData/Currday5';

// function App() {
//   const [curr, setCurr] = useState('')
//   const url = 'https://openexchangerates.org/api/latest.json?app_id=918bc0acfd564283af5708b7e3ad831e'
  
//   const currency = (async () => {
//     const response = await fetch(url)
//     const data = await response.json()
//     setCurr(data);
//     return curr
//   })
  
//   useEffect(() => {
//     if(process.env.NODE_ENV === 'production'){
//       currency()
//     } else MockCurrency()
//   }, [])

//   return (
//     <div className="App">
//       hey
//     </div>
//   );
// }

const MockCurrency = () => {
  let options = []
  let time
  
  const [date, setDate] = useState(Math.floor(Date.now() / 1000))
  const [currency, setCurrency] = useState()
  const currencies = Object.entries(currencyData.rates)
  for(let i = 0; i < currencies.length; i++){
    options.push({value: currencies[i][0], label: currencies[i][0]})
  }
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency)
  }
  const handleDateChange = (e) => {
    let clock = e.target.value
    console.log(clock)
    setDate(e.target.value)
    if(date > Math.floor(Date.now() / 1000)) {
      setDate(Math.floor(Date.now() / 1000))
    }
    time = (Math.floor(new Date(`${date}`).getTime() / 1000) + 61200)
    console.log(time)
  }
  const getDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month >= 10 ? month : '0' + month}-${day>= 10 ? day: '0' + day}`;
  }

return(
    <>
    Currency:<Select options={options} onChange={handleCurrencyChange} value={currency}/>
    Start Date:<input type='date' max={getDateString()}  onChange={handleDateChange} value={date}/>
    </>
    )
  }
export default MockCurrency;
