import logo from './logo.svg';
import axios from 'axios';
import { useRef,useState,useEffect } from 'react'



import './App.css';

function App() {
  const query = useRef()
  const [searchResults, setSearchResults] = useState([])
  const [isLoading,setIsLoading]=useState(false)
  const BASE_URL='https://google-search3.p.rapidapi.com/api/v1/search/q='
  const END_URL='&num=100'
  // useEffect(() => {
  //   console.log(localStorage.getItem('searchResults'))
  //   setSearchResults(JSON.parse(localStorage.getItem('searchResults')))
  //   return () => {
  //   }
  // }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true);
    console.log("query is  : ",query.current.value)
    
    const options = {
      method: 'GET',
      url: BASE_URL+query.current.value+END_URL,
      headers: {
          'X-User-Agent': 'desktop',
          'X-Proxy-Location': 'IN',
          'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
          'X-RapidAPI-Key': 'dd384c8d82mshdb26fb96bf401d1p143e68jsn224012091e61'
      }
      };

    axios.request(options).then(function (response) {
      
      console.log(response.data);
      setSearchResults(response.data.results);
      setIsLoading(false);
      // localStorage.setItem('searchResults',response.data.results)
    }).catch(function (error) {
      console.error(error);
    });
    // fetch(url, options)
    //   // .then(res => res.json())
    //   .then(res => {
    //     console.log(res);
    //     setSearchResults(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
  return (
    <div className="App">
      {/* <img src="https://i0.wp.com/bane-tech.com/wp-content/uploads/2015/10/O.png?ssl=1" className="App-logo" alt="logo" />
        <img src="https://149348887.v2.pressablecdn.com/wp-content/uploads/2015/10/M.png" className="App-logo" alt="logo" />
        <img src="https://149348887.v2.pressablecdn.com/wp-content/uploads/2015/10/M.png" className="App-logo" alt="logo" /> */}
      <div className='topnav'>
      <a className="logoHeader">Om's Search Engine</a>
        <form onSubmit={handleSubmit}>
          <input ref={query} placeholder="ask a question ?" className="query" />
        </form>
      </div>
        
      <hr/>
      {
        isLoading?
        <div className="loading">
          <h1>Loading ... </h1>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDpq_r5RckJ3c-PWtG4vtxtLWgFmErjdHCMA&usqp=CAU" className="App-logo"/>
        </div>:
        searchResults.map(res=>{
          return(
            <div className="info">
              <span>{res.cite.domain} : {res.cite.span}</span><br/>
              <a className="info-title" href={res.link} target="_blank">{res.title}</a>
              <p>{res.description}</p>
            </div>
          )
        })
      }
      
    </div>
  );
}

export default App;
