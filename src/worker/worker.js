// worker.js
const ports = new Set();

self.onconnect = (connectEvent) => {
  const port = connectEvent.ports[0];
  ports.add(port);
  
  port.onmessage = (event) => {
    
    // Puedes responder al cliente
    port.postMessage({ response: event.data });
  };
};
