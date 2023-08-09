import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';
import { ModalProvider } from './context/ModalContext.jsx';
import { SocketIOProvider } from './context/SocketIOContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<SocketIOProvider>
				<ModalProvider>
					<App />
				</ModalProvider>
			</SocketIOProvider>
		</AuthProvider>
	</React.StrictMode>
);
