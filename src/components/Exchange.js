import {useState} from 'react'
import Select from 'react-select'
import '../Exchange.css'

function Exchange(props) {
	const [exfr, setExfr] = useState('From Currency...')
	const [exto, setExto] = useState('To Currency...')
	const [amount, setAmount] = useState(null)
	const [answer, setAnswer] = useState()
	const api_key='0684cfccb66f8af553f36d1f'
	let url = `https://v6.exchangerate-api.com/v6/0684cfccb66f8af553f36d1f/pair/${exfr}/${exto}/${amount}`
	const api = (async () => {
			console.log(url)
			const response = await fetch(url)
			const data = await response.json()
			setAnswer(data.conversion_result)
			
	})
	const handleFromChange = (fromCurrency) => {
		setExfr(fromCurrency.label)
	}

	const handleToChange = (toCurrency) => {
		setExto(toCurrency.label)
	}

	const handleAmountChange = (e) => {
		setAmount(e.target.value)
		console.log(amount)
	}


	return(
		<div className='exchange-container'>
			<Select className='select' options={props.options} onChange={handleFromChange} value={exfr.label}/>
			<div>Amount:</div><input className='input' type='number' onChange={handleAmountChange} />
			<Select className='select' options={props.options} onChange={handleToChange} value={exto.label}/>
			<button className='third' onClick={api}>Exchange</button>
			<div className = 'answer'>{answer}</div>
		</div>
	)
}

export default Exchange;