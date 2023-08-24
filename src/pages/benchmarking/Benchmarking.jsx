import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// interface resultInterface {
//     type: 'String Literal' | 'Template Literal',
//     operation: 'Simple' | 'Concat 1 string' | 'Concat 2 string',
//     iteration: number,
//     time: number,
// }

const Benchmarking = () => {
	const [setPageTitle, setPageSubtitle] = useOutletContext();

	useEffect(() => {
		setPageSubtitle('A React Benchmarking Test Page');
	}, [setPageTitle, setPageSubtitle]);

	useEffect(() => {
		let result = [];
		const iterations = [10, 100, 10000, 1000000];
		const stringText = 'string';
		let text = '';

		iterations.forEach((iteration) => {
			let start = performance.now();

			for (let i = 0; i < iteration; i++) {
				text = 'text';
			}

			let end = performance.now();

			result.push({
				type: 'String literal',
				operation: 'Simple string',
				text,
				iteration,
				start,
				end,
				time: end - start,
			});

			start = performance.now();

			for (let i = 0; i < iteration; i++) {
				text = `text`;
			}

			end = performance.now();

			result.push({
				type: 'Template Literal',
				operation: 'Simple string',
				text,
				iteration,
				start,
				end,
				time: end - start,
			});

			start = performance.now();

			for (let i = 0; i < iteration; i++) {
				text = text = 'text ' + stringText;
			}

			end = performance.now();

			result.push({
				type: 'String literal',
				operation: 'Concat 1 string',
				text,
				iteration,
				start,
				end,
				time: end - start,
			});

			start = performance.now();

			for (let i = 0; i < iteration; i++) {
				text = `text ${stringText}`;
			}

			end = performance.now();

			result.push({
				type: 'Template Literal',
				operation: 'Concat 1 string',
				text,
				iteration,
				start,
				end,
				time: end - start,
			});
			start = performance.now();

			for (let i = 0; i < iteration; i++) {
				text = stringText + ' text ' + stringText;
			}

			end = performance.now();

			result.push({
				type: 'String Literal',
				operation: 'Concat 2 string',
				text,
				iteration,
				start,
				end,
				time: end - start,
			});

			start = performance.now();

			for (let i = 0; i < iteration; i++) {
				text = `${stringText} text ${stringText}`;
			}

			end = performance.now();

			result.push({
				type: 'Template Literal',
				operation: 'Concat 2 string',
				text,
				iteration,
				start,
				end,
				time: end - start,
			});
		});

		console.table(result);
	}, []);

	return <>Benchmarking</>;
};

export default Benchmarking;
