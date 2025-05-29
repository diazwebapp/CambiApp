// worker.js
let bcv = 0, paralelo = 0
const fetchRates = async () => {
  try {
    const req = await fetch("https://pydolarve.org/api/v2/dollar?page=alcambio&format_date=default&rounded_price=true", {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer JhZZj99yQrGoTOGdpNpOvQ'
      }
    })
    if (!req.ok) return false
    const res = await req.json()
    bcv = res.monitors.bcv.price
    paralelo = res.monitors.enparalelovzla.price
    // Envía a todos los puertos conectados
    broadcast({
      response: {
        rates: { bcv, paralelo }
      }
    });
  } catch (error) {
    console.error("reintentando en 2s... " + error)
    setTimeout(fetchRates, 2000)
  }
}
const ports = new Set();
function broadcast(message) {
  ports.forEach(port => {
    port.postMessage(message);
  });
}
self.onconnect = async (connectEvent) => {
  const port = connectEvent.ports[0];
  ports.add(port);

  port.onmessage = async (event) => {
      // Puedes responder al cliente
      if (event.data.setTasa) {
        broadcast({
          response: {
            currentTasa: event.data.setTasa
          }
        })
      }

      if (event.data === 'getRates') {
        // Si el cliente solicita tasas explícitamente
        if (bcv == 0 || paralelo == 0) {
          await fetchRates()
        }
      }

  };
  
    
};
fetchRates()