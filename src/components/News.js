import {useEffect, useState} from 'react'
import '../News.css'

function News() {
	const [news, setNews] = useState()
	const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d817161466114c0995a31013cc6f1f36'
	const api = (async () => {
		const response = await fetch(url)
		const data = await response.json()
		console.log(data)
		setNews(data)
		return news
	})
	useEffect(() => {
		api()
	}, [])
	function mapped() {
		console.log(news.articles)
		const information = news.articles.map((info, i) => {
			return (
				<div key={i}>
					<div className = 'news-block'>
						<div className = 'news-container'>
							<img className = 'img' src = {info.urlToImage}/>
							<div className = 'details'><a href={info.url}>{info.title}</a><br />
							{info.description}</div>
						</div>
					</div>
				</div>
			)
		})
		console.log(information)
		return(
			<>
			{information}
			</>
		)
	}

	return (
		<>
		{news ? mapped() : null}
		</>
	)
}
export default News;