import { writable } from 'svelte/store';
import io from 'socket.io-client';

const socket = io('http://52.29.9.150:80');
export const socketStore = writable(socket);


socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    // Perform any action on connect
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
    // Perform any action on disconnect
});


export default socketStore;
