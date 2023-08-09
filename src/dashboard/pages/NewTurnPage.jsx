import React from 'react';
import { TurnsForm } from '../components/TurnsForm';
import { HeaderTitleDashboard } from '../elements/HeaderTitleDashboard';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export const NewTurnPage = ({ title }) => {
	useDocumentTitle(title);
	return (
		<div>		
			<TurnsForm />
		</div>
	);
};
