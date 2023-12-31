export const HeaderTitleDashboard = ({ title, subtitle }) => {
	return (
		<div className='mt-1 mt-md-2 mt-lg-4 mb-2 mb-md-2 mb-lg-4'>
			<h2 style={{ letterSpacing: 0.1 }} className='display-4 fw-bold'>
				{title.at(0).toUpperCase() + title.slice(1)}
			</h2>
			<h4 className='display-6 fs-4'>
				{subtitle && subtitle.at(0).toUpperCase() + subtitle.slice(1)}
			</h4>
		</div>
	);
};
