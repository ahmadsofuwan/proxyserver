const socks = require('socksv5');

// Membuat server SOCKS4 dengan user dan password
const server = socks.createServer({
  authenticate: (username, password, socket, callback) => {
    if (username === 'user' && password === 'password') {
      callback(true);
    } else {
      callback(false);
    }
  }
}, (info, accept, deny) => {
  console.log(`Koneksi dari ${info.srcAddr}:${info.srcPort} ke ${info.dstAddr}:${info.dstPort}`);
  accept(); // Izinkan semua koneksi
});

// Jalankan server di port 1212
server.listen(1212, '0.0.0.0', () => {
  console.log('SOCKS4 proxy berjalan di port 1212');
});

// Penanganan error
server.on('error', (err) => {
  console.error('Error:', err);
});
