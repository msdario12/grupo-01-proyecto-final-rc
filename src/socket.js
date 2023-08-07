import { io } from 'socket.io-client';
const remoteHost = 'https://backend-grupo-01-proyecto-final-rc-zorb-dev.fl0.io';

// "undefined" means the URL will be computed from the `window.location` object
const URL = remoteHost;

export const socket = io(URL);
