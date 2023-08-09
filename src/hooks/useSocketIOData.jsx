import { useEffect, useState } from 'react';
import { socket } from '../socket';

export const useSocketIOData = () => {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [events, setEvents] = useState([]);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
			console.log('conexion');
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onFooEvent(value) {
			setEvents((previous) => [...previous, value]);
			console.log('🎟 de cliente', value);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('foo', onFooEvent);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('foo', onFooEvent);
		};
	}, []);
	return { isConnected, events };
};
