
import './App.css';
import MovieList from './components/MovieList/MovieList';



function App() {
 
  return (
    <div className='App'>
      <h1>Movie Search</h1>
      <MovieList />
    </div>
  );
}

export default App;

/**Phase 1 */
// Search ~ change query state on search input change
////// useState
//call API on search button click
///// use axios
//map through result
