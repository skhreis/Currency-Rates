import '../App.css';
import Select from 'react-select'
import {useState, useEffect} from "react"
import Chart1 from './Chart1'
import Exchange from './Exchange'

const getDateString = (e) => {
  const today = new Date(e);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month >= 10 ? month : '0' + month}-${day>= 10 ? day: '0' + day}`;
}

let max = new Date()
max.setDate(max.getDate()-6)

const middleDate = (start, end) => {
  let date1 = new Date(start)
  let date2 = new Date(end)
  console.log(date1)
  console.log(date2)
  console.log(getDateString(new Date((date1.getTime() + date2.getTime())/2)))
  getDateString(new Date(date2 - (date2-date1)/2))
  return getDateString(new Date(date2 - (date2-date1)/2))
}



function App() {
  // VARIABLES
  let choices = []
  const [date, setDate] = useState(getDateString(max))
  const [currency, setCurrency] = useState('USD')
  const [value, setValue] = useState(1)
  const [curr, setCurr] = useState()
  const [curr1, setCurr1] = useState(null)
  const [curr2, setCurr2] = useState(null)
  const [curr3, setCurr3] = useState(null)
  const [curr4, setCurr4] = useState(null)
  const url = 'https://openexchangerates.org/api/latest.json?app_id=918bc0acfd564283af5708b7e3ad831e'
  const api = (async () => {
    const response = await fetch(url)
    const data = await response.json()
    const currencies = Object.entries(data.rates)
    for(let i = 0; i < currencies.length; i++){
      choices.push({label: currencies[i][0], value: currencies[i][1]})
    }
    setCurr(choices)
    return curr
  })
  async function history() {
    let url1=`https://openexchangerates.org/api/historical/${date}.json?app_id=918bc0acfd564283af5708b7e3ad831e&symbols=${currency}`
    let url2=`https://openexchangerates.org/api/historical/${middleDate(date, middleDate(date, new Date()))}.json?app_id=918bc0acfd564283af5708b7e3ad831e&symbols=${currency}`
    let url3=`https://openexchangerates.org/api/historical/${middleDate(date, new Date())}.json?app_id=918bc0acfd564283af5708b7e3ad831e&symbols=${currency}`
    let url4=`https://openexchangerates.org/api/historical/${middleDate(middleDate(date, new Date()), getDateString(new Date()))}.json?app_id=918bc0acfd564283af5708b7e3ad831e&symbols=${currency}`
    const response1 = await fetch(url1)
    const response2 = await fetch(url2)
    const response3 = await fetch(url3)
    const response4 = await fetch(url4)
    const data1 = await response1.json()
    const data2 = await response2.json()
    const data3 = await response3.json()
    const data4 = await response4.json()
    setCurr1(Object.values(data1.rates)[0])
    setCurr2(Object.values(data2.rates)[0])
    setCurr3(Object.values(data3.rates)[0])
    setCurr4(Object.values(data4.rates)[0])
  }
  function loaded() {

    const handleCurrencyChange = (newCurrency) => {
      setCurrency(newCurrency.label)
      setValue(newCurrency.value)
    }

    const handleDateChange = (e) => {
      setDate(e.target.value)
      if(date > Math.floor(Date.now() / 1000)) {
        setDate(Math.floor(Date.now() / 1000) + 86400)
      }
    }
  return(
    <>
      <div className= 'container'>
        <div className= 'graphs'>
          Currency:<Select options={curr} onChange={handleCurrencyChange} value={currency.label}/>
          Start Date:<input type='date' max={getDateString(max)} onChange={handleDateChange} value={date}/>
          <Chart1 
            date={date} 
            today={getDateString(new Date())} 
            currency={currency} 
            value1={curr1} 
            value2={curr2} 
            value3={curr3} 
            value4={curr4} 
            value5={value} 
            secondDate={middleDate(date, middleDate(date, new Date()))}
            middleDate={middleDate(date, new Date())}
            fourthDate={middleDate(middleDate(date, new Date()), getDateString(new Date()))}/>
        </div>
        <div className= 'currency-exchange'>
          <Exchange options={curr}/>
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
  function loading() {
    return <div>Loading...</div>
  }
  useEffect(() => {
    api();
  }, [])
  useEffect(() => {
    history();
  },[date, currency])
  return (curr ? loaded() : loading())
}
  export default App;