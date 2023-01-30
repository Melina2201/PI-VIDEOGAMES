import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import home from './components/home/home';
import landingPage from './components/landingPage/landingPage.jsx';
import Details from './components/detail/Details';
import CreateVideogame from './components/NewVGames/FormCreate';

function App() {
	
	return (
		<BrowserRouter>
			<div className='App'>
				<Route exact path='/' component={landingPage} />
				<Route exact path='/videogames' component={home} />
				<Route  path='/videogame/:id' component={Details} />
				<Route exact path='/creategame' component={CreateVideogame} />
			</div>
		</BrowserRouter>
	);
} 
 

export default App;

