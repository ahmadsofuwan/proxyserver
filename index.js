const socks = require('socksv5');

// Konfigurasi Username dan Password
const USERNAME = 'ahmadsofuwan';
const PASSWORD = 'ahmadsofuwan123123';

// Membuat server SOCKS5
const server = socks.createServer((info, accept, deny) => {
  console.log(`Koneksi dari ${info.srcAddr}:${info.srcPort} ke ${info.dstAddr}:${info.dstPort}`);
  accept(); // Izinkan semua koneksi
});

// Autentikasi Username dan Password
server.useAuth(socks.auth.UserPassword((user, password, callback) => {
  if (user === USERNAME && password === PASSWORD) {
    console.log(`Autentikasi sukses: ${user}`);
    callback(true);
  } else {
    console.log(`Autentikasi gagal: ${user}`);
    callback(false);
  }
}));

// Jalankan server di port 1080
server.listen(1080, '0.0.0.0', () => {
  console.log('SOCKS5 proxy dengan autentikasi berjalan di port 1080');
});

// Penanganan error
server.on('error', (err) => {
  console.error('Error:', err);
});
