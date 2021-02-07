// 2021-02-07 https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
import {render, screen} from '@testing-library/react';
import App from './App';
test('renders learn react link', () => {
	render(<App/>);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});