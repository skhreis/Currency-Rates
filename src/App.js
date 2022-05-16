import './App.css';
import {useState, useEffect} from "react"
import currencyData from './mockData/mockdatacurr';
import Currday1 from './mockData/Currday1';
import Currday2 from './mockData/Currday2';
import Currday3 from './mockData/Currday3';
import Currday4 from './mockData/Currday4';
import Currday5 from './mockData/Currday5';

function App() {
  let year = 0
  let month = 0
  let day = 0

  if(year < 1999 || year > 2022){
    alert("Date must be between ")
  }
  const isProd = NODE_ENV === 'production'
  const [curr, setCurr] = useState('')
  const url = 'https://openexchangerates.org/api/latest.json?app_id=918bc0acfd564283af5708b7e3ad831e'
  const testing = isProd ? await currency() : mockCurrency()
  
  
  const currency = (async () => {
    const response = await fetch(url)
    const data = await response.json()
    setCurr(data);
    console.log(curr)
    return data.json()
  })
  
  useEffect(() => {
    currency()
  }, [])

  const mockCurrency = () => {

  }


  return (
    <div className="App">
    </div>
  );
}

export default App;
