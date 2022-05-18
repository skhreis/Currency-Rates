import {useState, useEffect} from 'react'
import App from './App'

const getDateString = (e) => {
	const today = new Date(e);
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();
	return `${year}-${month >= 10 ? month : '0' + month}-${day>= 10 ? day: '0' + day}`;  
}

const middleDate = (start, end) => {
	let date1 = new Date(start)
	let date2 = new Date(end)
	getDateString(new Date(date2 - (date2-date1)/2))
	return getDateString(new Date(date2 - (date2-date1)/2))
  }

function History(props) {
	let choices1 = []
	let choices2 = []
	let choices3 = []
	let choices4 = []
	const [curr1, setCurr1] = useState()
	const [curr2, setCurr2] = useState()
	const [curr3, setCurr3] = useState()
	const [curr4, setCurr4] = useState()

	const currHistory = async () => {
		let pastDateUrl1=`https://openexchangerates.org/api/historical/${props.date}.json?app_id=YOUR_APP_ID`
		let pastDateUrl2=`https://openexchangerates.org/api/historical/${middleDate(props.date, middleDate(props.date, new Date()))}.json?app_id=YOUR_APP_ID`
		let pastDateUrl3=`https://openexchangerates.org/api/historical/${middleDate(props.date, new Date())}.json?app_id=YOUR_APP_ID`
		let pastDateUrl4=`https://openexchangerates.org/api/historical/${middleDate(middleDate(props.date, new Date()), getDateString(new Date()))}.json?app_id=YOUR_APP_ID`
		const response1 = await fetch(pastDateUrl1)
		const response2 = await fetch(pastDateUrl2)
		const response3 = await fetch(pastDateUrl3)
		const response4 = await fetch(pastDateUrl4)
		const data1 = await response1.json()
		const data2 = await response2.json()
		const data3 = await response3.json()
		const data4 = await response4.json()
		setCurr1(data1)
		setCurr2(data2)
		setCurr3(data3)
		setCurr4(data4)
  	}
	useEffect(() => {
		currHistory()
	})
	
	function loaded() {
		const currencies1 = Object.entries(curr1.rates)
		for(let i = 0; i < currencies1.length; i++){
			choices1.push({label: currencies1[i][0], value: currencies1[i][1]})
		}
		const currencies2 = Object.entries(curr2.rates)
		for(let i = 0; i < currencies2.length; i++){
			choices2.push({label: currencies2[i][0], value: currencies2[i][1]})
		}
		const currencies3 = Object.entries(curr3.rates)
		for(let i = 0; i < currencies3.length; i++){
			choices3.push({label: currencies3[i][0], value: currencies3[i][1]})
		}
		const currencies4 = Object.entries(curr4.rates)
		for(let i = 0; i < currencies4.length; i++){
			choices4.push({label: currencies4[i][0], value: currencies4[i][1]})
		}
		
		return(
			<App value1={choices1.value} value2={choices2.value} value3={choices3.value} value4={choices4.value}/>
		)
	}

	function loading(){
		return <div>Loading...</div>
	}

	return(
		<>
		{curr4 ? loaded() : loading()}
		</>
	)
}
	
	export default History;