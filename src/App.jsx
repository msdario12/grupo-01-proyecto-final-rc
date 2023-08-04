import { useSocketIOData } from './hooks/useSocketIOData';
import { AppRouter } from './routes/AppRouter';

function App() {
	const { events, isConnected } = useSocketIOData();
	return <AppRouter />;
}

export default App;
