import { createContext } from 'react';
import { useSocketIOData } from '../hooks/useSocketIOData';

export const SocketIOContext = createContext({});

export const SocketIOProvider = ({ children }) => {
	const { isConnected, events } = useSocketIOData();
	return (
		<SocketIOContext.Provider value={{ isConnected, events }}>
			{children}
		</SocketIOContext.Provider>
	);
};
