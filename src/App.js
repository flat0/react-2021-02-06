// 2021-02-07 https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
import logo from './logo.svg';
import './App.css';
function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo'/>
				<p>Edit <code>src/App.js</code> and save to reload 111.</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					rel='noopener noreferrer'
					target='_blank'
				>Learn React</a>
			</header>
		</div>
	);
}
export default App;