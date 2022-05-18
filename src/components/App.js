import '../App.css';
import Select from 'react-select'
import {useState, useEffect} from "react"
import Chart1 from './Chart1'
import History from './History';

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


function App() {
  // VARIABLES
  let name
  let choices = []
  const [edate, setEDate] = useState()
  const [date, setDate] = useState(getDateString(max))
  const [currency, setCurrency] = useState('USD')
  const [value, setValue] = useState(1)
  const [curr, setCurr] = useState()
  const url = 'https://openexchangerates.org/api/latest.json?app_id=918bc0acfd564283af5708b7e3ad831e'
  const api = (async () => {
    const response = await fetch(url)
    const data = await response.json()
    setCurr(data);
    return curr
  })
  
  useEffect(() => {
    api()
  })

  function loaded() {
    const currencies = Object.entries(curr.rates)
    for(let i = 0; i < currencies.length; i++){
      choices.push({label: currencies[i][0], value: currencies[i][1]})
    }

    
    const handleCurrencyChange = (newCurrency) => {
      setCurrency(newCurrency)
      setValue(newCurrency)
      console.log(newCurrency)
      name = newCurrency

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
            value5={1} 
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
      <History middleDate={middleDate()} name={name} getDateString={getDateString()} date={date}/>
      </>
      )
  }
  function loading() {
    return <div>Loading...</div>
  }
  return (curr ? loaded() : loading())
}
  export default App;