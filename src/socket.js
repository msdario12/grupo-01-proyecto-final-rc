import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://backend-grupo-01-proyecto-final-rc-zorb-dev.fl0.io';

export const socket = io(URL);
