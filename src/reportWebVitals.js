// 2021-02-07 https://reactjs.org/docs/create-a-new-react-app.html#create-react-app
const reportWebVitals = onPerfEntry => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
			getCLS(onPerfEntry);
			getFID(onPerfEntry);
			getFCP(onPerfEntry);
			getLCP(onPerfEntry);
			getTTFB(onPerfEntry);
		});
	}
};
export default reportWebVitals;