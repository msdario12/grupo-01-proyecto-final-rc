import {
	faSort,
	faSortAsc,
	faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const sortIcons = {
	original: faSortAsc,
	descend: faSort,
	ascend: faSortDesc,
};

export const CustomTh = ({
	title,
	name,
	setTurnsList,
	sortedColumn,
	setSortedColumn,
}) => {
	const [sortMode, setSortMode] = useState('ascend');

	useEffect(() => {
		if (sortedColumn !== name) {
			setSortMode('ascend');
		}
	}, [sortedColumn, name]);

	const switchSortMode = () => {
		if (sortMode === 'original') {
			setSortMode('descend');
			return;
		}
		if (sortMode === 'descend') {
			setSortMode('ascend');
			return;
		}
		if (sortMode === 'ascend') {
			setSortMode('original');
			return;
		}
	};

	const comparingFunction = (a, b, name) => {
		console.log(typeof a[name], sortMode);
		if (sortMode === 'original') {
			return a['id'] - b['id'];
		}
		const nameA = typeof a[name] === 'string' ? a[name].toUpperCase() : a[name]; // ignore upper and lowercase
		const nameB = typeof b[name] === 'string' ? b[name].toUpperCase() : b[name]; // ignore upper and lowercase

		if (nameA < nameB) {
			return sortMode === 'descend' ? 1 : -1;
		}
		if (nameA > nameB) {
			return sortMode === 'descend' ? -1 : 1;
		}
		// names must be equal
		return 0;
	};
	const handleClickSortColumn = (name) => {
		setSortedColumn(name);
		console.log(sortMode);
		switchSortMode();
		setTurnsList((prev) =>
			[...prev].sort((a, b) => comparingFunction(a, b, name))
		);
	};

	return (
		<th
			style={{ cursor: 'pointer' }}
			className={`small ${
				sortedColumn === name ? 'bg-primary text-light' : 'text-muted'
			}`}
			onClick={() => handleClickSortColumn(name)}>
			<div className='d-flex align-items-center justify-content-between'>
				<span className='me-2'>{title}</span>
				<FontAwesomeIcon
					style={{ cursor: 'pointer' }}
					icon={sortIcons[sortMode]}
				/>
			</div>
		</th>
	);
};
