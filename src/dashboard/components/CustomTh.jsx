import {
	faSort,
	faSortAsc,
	faSortDesc,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const sortIcons = {
	original: faSortDesc,
	ascend: faSort,
	descend: faSortAsc,
};

export const CustomTh = ({
	idName = 'id',
	title,
	name,
	setTurnsList,
	sortedColumn,
	setSortedColumn,
	hasIcon = true,
	isCenter = false,
}) => {
	const [sortMode, setSortMode] = useState('ascend');

	useEffect(() => {
		if (sortedColumn !== name) {
			setSortMode('ascend');
		}
	}, [sortedColumn, name]);

	const switchSortMode = () => {
		if (sortMode === 'original') {
			setSortMode('ascend');
			return;
		}
		if (sortMode === 'ascend') {
			setSortMode('descend');
			return;
		}
		if (sortMode === 'descend') {
			setSortMode('original');
			return;
		}
	};

	const comparingFunction = (a, b, name) => {
		console.log(typeof a[name], sortMode);
		if (sortMode === 'original') {
			return a[idName] - b[idName];
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
			style={{ cursor: hasIcon ? 'pointer' : 'auto' }}
			className={`small ${
				sortedColumn === name ? 'bg-primary text-light' : 'text-muted'
			}`}
			onClick={() => hasIcon && handleClickSortColumn(name)}>
			<div
				className={`d-flex align-items-center ${
					isCenter ? 'justify-content-center' : 'justify-content-between'
				}`}>
				<span className='me-2'>{title}</span>
				{hasIcon ? (
					<FontAwesomeIcon
						style={{ cursor: 'pointer' }}
						icon={sortIcons[sortMode]}
					/>
				) : (
					''
				)}
			</div>
		</th>
	);
};
