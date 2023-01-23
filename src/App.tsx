import { useState, useEffect } from 'react'

let ID_COUNT = 0;

function App() {
  const [description, setDescription] = useState<string>('');
  const [randomQuote, setRandomQuote] = useState<string>('');
  const [randomQuoteAuthor, setRandomQuoteAuthor] = useState<string>('');
  const [searchResults, setSearchResults] = useState([]);
  const [mainContainerClass, setMainContainerClass] = useState<string>('main-container-big');
  const [homeQuoteHidden, setHomeQuoteHidden] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://usu-quotes-mimic.vercel.app/api/random')
      .then(res => res.json())
      .then(quote => {
        setRandomQuote(quote.content)
        setRandomQuoteAuthor(quote.author)
      })

  }, [])

  function searchQuote(searchText: String) {
    fetch('https://usu-quotes-mimic.vercel.app/api/search?query=' + searchText)
      .then(res => res.json())
      .then(quotes => {
        setSearchResults(quotes.results)
        console.log(searchResults)
        setHomeQuoteHidden(true)
        setMainContainerClass('main-container')
      })
  }

  return (
    <div className="App">
      <div className={mainContainerClass}>
        <h1 className='main-header'>Quote Search</h1>
        <form className='search-container' onSubmit={(e) => {
            e.preventDefault();
            searchQuote(description)
          }}>
          <input 
          type="text" 
          value={description}
          placeholder='Albert Einstein'
          onChange={(e) => setDescription(e.target.value)}
          />
        </form>

        <section className='home-quote' hidden={homeQuoteHidden}>
          <h3>{randomQuote}</h3>
          <p>{randomQuoteAuthor}</p>
        </section>

        <section className='search-results' hidden={!homeQuoteHidden}>
          { searchResults.length > 0 ? searchResults.map((quote) => (
            <div key={quote.id} className="quote-item">
              <h3>{quote.content}</h3>
              <p>{quote.author}</p>
            </div>
          )) : <div className="quote-item"><h3>No results found</h3></div>}
        </section>
      </div>
      

      

      {/* <div>
        {
          todos.map((todo) => (
            <div key={todo.id}>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)}/> {todo.description}
            </div>
          ))
        }
      </div> */}
    </div>
    
  )
}

export default App
