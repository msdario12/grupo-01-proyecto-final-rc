import { WelcomeInfo } from '../components/WelcomeInfo';

export const MainDashboard = () => {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true);
	return (
		<div className='p-3'>
			<WelcomeInfo />
		</div>
	);
};
