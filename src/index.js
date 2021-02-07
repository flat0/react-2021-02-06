// 2021-02-07 https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
class Board extends React.Component {
	// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#passing-data-through-props
	renderSquare(i) {return <Square value={i}/>;}
	render() {
		const status = 'Next player: X';
		return (
			<div>
				<div className='status'>{status}</div>
				<div className='board-row'>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className='board-row'>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className='board-row'>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}
class Game extends React.Component {
	render() {
		return (
			<div className='game'>
				<div className='game-board'>
					<Board/>
				</div>
				<div className='game-info'>
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}
class Square extends React.Component {
	// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#passing-data-through-props
	render() {return <button className='square'>{this.props.value}</button>;}
}
ReactDOM.render(<Game/>, document.getElementById('root'));