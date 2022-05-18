import {useState, useEffect} from 'react'
import Select from 'react-select'

function Exchange(props) {
	// console.log(props)
	const [exfr, setExfr] = useState('From Currency...')
	const [exto, setExto] = useState('To Currency...')
	const [info, setInfo] = useState()
	const [amount, setAmount] = useState(null)
	const [answer, setAnswer] = useState('Rate')
	const api_key='hey'
	let url = `https://api.exchangeratesapi.io/v1/convert?access_key=${api_key}&from=${exfr.label}&to=${exto.label}&amount=${amount}`
	const api = (async () => {
		if(amount) {
			const response = await fetch(url)
			const data = response.json()
			setInfo(data)
			setAnswer()
		}	
	})
	const handleFromChange = (fromCurrency) => {
		setExfr(fromCurrency)
	}

	const handleToChange = (toCurrency) => {
		setExto(toCurrency)
	}



	return(
		<>
		<Select options={props.options} onChange={handleFromChange} value={exfr}/>
		<span>$</span><input type='number'  />
		<Select options={props.options} onChange={handleToChange} value={exto}/>
		<button onClick={api}>Exchange</button>
		<div>{answer}</div>
		</>
	)
}

export default Exchange;