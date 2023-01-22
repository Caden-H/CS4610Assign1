import { useState, useEffect } from 'react'

let ID_COUNT = 0;

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState<string>('');
  const [analyticRecorded, setAnalyticRecorded] = useState(false);
  const [randomQuote, setRandomQuote] = useState<string>('');
  const [randomQuoteAuthor, setRandomQuoteAuthor] = useState<string>('');

  useEffect(() => {
    if (todos.length === 2 && !analyticRecorded) {
      alert('You have 2 todos!')
      setAnalyticRecorded(true);
    }
  }, [todos, analyticRecorded])

  let randomQ = ''

  useEffect(() => {
    // console.log('Mounted')
    // fetch('https://usu-quotes-mimic.vercel.app/api/random')
    //   .then(res => res.json())
    //   .then(quote => setRandomQuote(quote.content))
    // return () => {
    //   setRandomQuoteAuthor(quote.author)
    // }

    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    console.log(await result.json());

  }, [])

  function saveTodo() {
    const newTodo: Todo = {
      id: ID_COUNT++,
      description,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setDescription('');
  }

  function toggleTodo(todo: Todo) {
    // const index = todos.indexOf(todo);
    // const newTodos = [...todos];
    // newTodos[index] = {...todo, completed: !todo.completed};
    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return t;
    })
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div className='main-container'>
        <h1 className='main-header'>Quote Search</h1>
        <form className='search-container'>
          <input 
          type="text" 
          value={description}
          placeholder='Albert Einstein'
          onChange={(e) => setDescription(e.target.value)}
          onSubmit={(e) => {  }}
          />
        </form>

        <section className='home-quote'>
          <h3>{randomQuote}</h3>
        </section>

        <section className='search-results'>
          
        </section>

      </div>
      
      <button onClick={saveTodo}>Save</button>

      

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
