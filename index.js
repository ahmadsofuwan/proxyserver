const socks = require('socksv5');

// Membuat server SOCKS4
const server = socks.createServer((info, accept, deny) => {
  console.log(`Koneksi dari ${info.srcAddr}:${info.srcPort} ke ${info.dstAddr}:${info.dstPort}`);
  accept(); // Izinkan semua koneksi
});

// Jalankan server di port 1080
server.listen(1212, '0.0.0.0', () => {
  console.log('SOCKS4 proxy berjalan di port 1212');
});

// Penanganan error
server.on('error', (err) => {
  console.error('Error:', err);
});
