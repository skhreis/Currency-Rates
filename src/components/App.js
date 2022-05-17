import '../App.css';
import Select from 'react-select'
import {useState, useEffect} from "react"
import currencyData from '../mockData/currencyData';
import Chart1 from './Chart1'
// import Chart3 from './Chart3'
// import Chart4 from './Chart4'

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

const getDateString = (e) => {
  const today = new Date(e);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month >= 10 ? month : '0' + month}-${day>= 10 ? day: '0' + day}`;
}


let max = new Date()
max.setDate(max.getDate()-5)
console.log(getDateString(max))

const MockCurrency = () => {
  // VARIABLES
  let choices = []
  const [edate, setEDate] = useState()
  const [date, setDate] = useState(getDateString(max))
  const [currency, setCurrency] = useState('USD')
  const [value, setValue] = useState(1)
  const currencies = Object.entries(currencyData.rates)
  // FOR LOOP FOR CURRENCY NAMES (CURRENCIES have values in them)
  for(let i = 0; i < currencies.length; i++){
    choices.push({label: currencies[i][0], value: currencies[i][1]})
  }
  
  // Setting maximum date for date input
  
  // Handle changes

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency)
    setValue(newCurrency)
  }
  const handleDateChange = (e) => {
    setDate(e.target.value)
    if(date > Math.floor(Date.now() / 1000)) {
      setDate(Math.floor(Date.now() / 1000) + 86400)
    }
    setEDate((new Date(date).getTime() / 1000) + 86399)
  }

  const middleDate = (start, end) => {
    let date1 = new Date(start)
    let date2 = new Date(end)
    getDateString(new Date(date2 - (date2-date1)/2))
    return getDateString(new Date(date2 - (date2-date1)/2))
  }

return(
    <>
    <div className= 'container'>
      <div className= 'graphs'>
        Currency:<Select options={choices} onChange={handleCurrencyChange} value={currency}/>
        Start Date:<input type='date' max={getDateString(max)} onChange={handleDateChange} value={date}/>
        <Chart1 
          date={date} 
          today={getDateString(new Date())} 
          currency={currency.label} 
          value1={1} 
          value2={2} 
          value3={3} 
          value4={4} 
          value5={value.value} 
          secondDate={middleDate(date, middleDate(date, new Date()))}
          middleDate={middleDate(date, new Date())}
          fourthDate={middleDate(middleDate(date, new Date()), getDateString(new Date()))}/>
      </div>
      <div className= 'currency-exchange'>
        hey man stop taking so much space
      </div>
      <div className= 'news-feed'>
        hey man stop taking so much space
      </div>
      <div className= 'my-info'>
        hey man stop taking so much space
      </div>
    </div>
    </>
    )
  }
export default MockCurrency;
