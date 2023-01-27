import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import home from './components/home/home';
import landingPage from './components/landingPage/landingPage.jsx';
import Details from './components/detail/Details';
//import CreateVideogame from './components/CreateVideogame/CreateVideogame.jsx';

function App() {
	
	return (
		<BrowserRouter>
			<div className='App'>
				<Route exact path='/' component={landingPage} />
				<Route exact path='/videogames' component={home} />
				<Route  path='/videogame/:id' component={Details} />
			</div>
		</BrowserRouter>
	);
} 
 /* 
 <Route exact path='/create' component={CreateVideogame} />
  */

export default App;

