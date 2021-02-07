// 2021-02-07 https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
class Board extends React.Component {
	/**
	 * 2021-02-08 https://reactjs.org/tutorial/tutorial.html#lifting-state-up
	 * @param d
	 */
	constructor(d) {
		super(d);
		this.state = {squares: Array(9).fill(null)};
	}

	/**
	 * 2021-02-08 https://reactjs.org/tutorial/tutorial.html#lifting-state-up
	 * @param {Number} i
	 */
	handleClick(i) {
		// 2021-02-08
		// 1) «Avoiding direct data mutation lets us keep previous versions of the game’s history intact, and reuse them later»:
		// https://reactjs.org/tutorial/tutorial.html#complex-features-become-simple
		// 2) «Detecting changes in mutable objects is difficult because they are modified directly.
		// This detection requires the mutable object to be compared to previous copies of itself
		// and the entire object tree to be traversed.
		// Detecting changes in immutable objects is considerably easier.
		// If the immutable object that is being referenced is different than the previous one, then the object has changed.»
		// https://reactjs.org/tutorial/tutorial.html#detecting-changes
		// 3) «The main benefit of immutability is that it helps you build pure components in React.
		// Immutable data can easily determine if changes have been made,
		// which helps to determine when a component requires re-rendering.»
		// https://reactjs.org/tutorial/tutorial.html#determining-when-to-re-render-in-react
		const squares = this.state.squares.slice();
		squares[i] = 'X';
		this.setState({squares: squares});
	}
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
	/**
	 * 2021-02-08
	 * 1) https://reactjs.org/tutorial/tutorial.html#passing-data-through-props
	 * 2) https://reactjs.org/tutorial/tutorial.html#lifting-state-up
	 * @param {Number} i
	 * @returns {JSX.Element}
	 */
	renderSquare(i) {return <Square onClick={() => this.handleClick(i)} value={this.state.squares[i]}/>;}
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
/**
 * 2021-02-08 https://reactjs.org/tutorial/tutorial.html#function-components
 * @param {Object} d
 * @returns {JSX.Element}
 */
function Square(d) {return(
	// 2021-02-08
	// 1) https://reactjs.org/tutorial/tutorial.html#making-an-interactive-component
	// 2) «When a `Square` is clicked, the `onClick` function provided by the `Board` is called.
	// Here’s a review of how this is achieved:
	// 1) The `onClick` prop on the built-in DOM `<button>` component tells React to set up a click event listener.
	// 2) When the button is clicked,
	// React will call the `onClick` event handler that is defined in `Square`’s `render()` method.
	// 3) This event handler calls `this.props.onClick()`.
	// The `Square`’s `onClick` prop was specified by the Board.
	// 4) Since the `Board` passed `onClick={() => this.handleClick(i)}` to `Square`,
	// the `Square` calls `this.handleClick(i)` when clicked.»
	// https://reactjs.org/tutorial/tutorial.html#lifting-state-up
	<button className='square' onClick={d.onClick}>
		{/* 2021-02-08 https://reactjs.org/tutorial/tutorial.html#passing-data-through-props */}
		{d.value}
	</button>
);}
ReactDOM.render(<Game/>, document.getElementById('root'));