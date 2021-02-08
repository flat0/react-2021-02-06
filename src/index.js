// 2021-02-07 https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
class Board extends React.Component {
	render() {return (
		<div>
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
	);}
	/**
	 * 2021-02-08
	 * 1) https://reactjs.org/tutorial/tutorial.html#passing-data-through-props
	 * 2) https://reactjs.org/tutorial/tutorial.html#lifting-state-up
	 * 3) https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again
	 * @param {Number} i
	 * @returns {JSX.Element}
	 */
	renderSquare(i) {return <Square onClick={() => this.props.onClick(i)} value={this.props.squares[i]}/>;}
}
class Game extends React.Component {
	/**
	 * 2021-02-08 https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again
	 * @param {Object} d
	 */
	constructor(d) {
		super(d);
		this.state = {
			history: [{squares: Array(9).fill(null)}]
			,stepNumber: 0 // 2021-02-08 https://reactjs.org/tutorial/tutorial.html#implementing-time-travel
			,xIsNext: true // 2021-02-08 https://reactjs.org/tutorial/tutorial.html#taking-turns
		};
	}
	/**
	 * 2021-02-08
	 * 1) https://reactjs.org/tutorial/tutorial.html#lifting-state-up
	 * 2) https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again
	 * @param {Number} i
	 */
	handleClick(i) {
		// 2021-02-08
		// 1) https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again
		// 2) «This ensures that if we “go back in time” and then make a new move from that point
		// we throw away all the “future” history that would now become incorrect.»
		// https://reactjs.org/tutorial/tutorial.html#implementing-time-travel
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
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
		const squares = current.squares.slice();
		// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#declaring-a-winner
		if (!calculateWinner(squares) && !squares[i]) {
			squares[i] = this.state.xIsNext ? 'X' : 'O'; // 2021-02-08 https://reactjs.org/tutorial/tutorial.html#taking-turns
			this.setState({
				// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again
				history: history.concat([{squares: squares}])
				,stepNumber: history.length // 2021-02-08 https://reactjs.org/tutorial/tutorial.html#implementing-time-travel
				,xIsNext: !this.state.xIsNext // 2021-02-08 https://reactjs.org/tutorial/tutorial.html#taking-turns
			});
		}
	}
	/**
	 * 2021-02-08 https://reactjs.org/tutorial/tutorial.html#implementing-time-travel
	 * @param {Number} step
	 */
	jumpTo(step) {this.setState({stepNumber: step, xIsNext: (step % 2) === 0});}
	render() {
		// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again
		const history = this.state.history;
		const current = history[history.length - 1];
		// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#declaring-a-winner
		const winner = calculateWinner(current.squares);
		// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#taking-turn
		const status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#showing-the-past-moves
		const moves = history.map((step, move) => {
			const desc ='Go to ' + (move ? 'move #' + move : 'game start');
			// 2021-02-08 https://reactjs.org/tutorial/tutorial.html#implementing-time-travel
			return <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>;
		});
		return (
			<div className='game'>
				<div className='game-board'>
					{/* 2021-02-08 https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again */}
					<Board
						onClick={(i) => this.handleClick(i)}
						squares={current.squares}
					/>
				</div>
				<div className='game-info'>
					<div>{status}</div> {/* 2021-02-08 https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again */}
					<ol>{moves}</ol> {/* 2021-02-08 https://reactjs.org/tutorial/tutorial.html#showing-the-past-moves */}
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
	// 2.1) The `onClick` prop on the built-in DOM `<button>` component tells React to set up a click event listener.
	// 2.2) When the button is clicked,
	// React will call the `onClick` event handler that is defined in `Square`’s `render()` method.
	// 2.3) This event handler calls `this.props.onClick()`.
	// The `Square`’s `onClick` prop was specified by the Board.
	// 2.4) Since the `Board` passed `onClick={() => this.handleClick(i)}` to `Square`,
	// the `Square` calls `this.handleClick(i)` when clicked.»
	// https://reactjs.org/tutorial/tutorial.html#lifting-state-up
	// 3) «When we modified the `Square` to be a function component,
	// we also changed `onClick={() => this.props.onClick()}` to a shorter `onClick={props.onClick}`
	// (note the lack of parentheses on both sides).»
	// https://reactjs.org/tutorial/tutorial.html#function-components
	<button className='square' onClick={d.onClick}>
		{/* 2021-02-08 https://reactjs.org/tutorial/tutorial.html#passing-data-through-props */}
		{d.value}
	</button>
);}
ReactDOM.render(<Game/>, document.getElementById('root'));
/**
 * 2021-02-08
 * «Given an array of 9 squares, this function will check for a winner and return 'X', 'O', or null as appropriate»:
 * https://reactjs.org/tutorial/tutorial.html#declaring-a-winner
 * @param {String[]} s
 * @returns {null|*}
 */
function calculateWinner(s) {
	var r = null;
	const lines = [
		[0, 1, 2]
		,[3, 4, 5]
		,[6, 7, 8]
		,[0, 3, 6]
		,[1, 4, 7]
		,[2, 5, 8]
		,[0, 4, 8]
		,[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (s[a] && s[a] === s[b] && s[a] === s[c]) {
			r = s[a];
			break;
		}
	}
	return r;
}