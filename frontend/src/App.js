import {getIndexRoute} from './utils/api'
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [index, setIndex]= useState([]);

  useEffect(() => {
		try {
			getIndexRoute().then((data) => {
				setIndex(data);
        console.log('this is', data);
			});
		} catch (error) {
			console.log(error);
		}
	}, [])

  return (
    <div className="App">
      <header className="App-header">
        ...
      </header>
      <form>
        
      </form>
    </div>
  );
}

export default App;
