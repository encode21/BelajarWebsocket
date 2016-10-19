'use strict';

var app = require('express')(); // kita declare/merequire/include express
var http = require('http').Server(app); // kita declare http agar bisa akses di browser dengan server app
var io = require('socket.io')(http); // kita declare socket io
var path = require('path'); // kemudian path

app.set('port', process.env.PORT || 3000); // untuk ambil PORT
app.set('views', path.join(__dirname,'views')); // mengambil views melalui path
app.set('view engine', 'jade'); // panggil jade sebagai view engine

app.use(require('express').static(path.join(__dirname, 'public')));
app.use(require('express').static(path.join(__dirname, 'bower_components')));

app.get('/', function(req,res) {
  return res.render('index');
});
//merouting saat pertama akses lalu kemudian render file index.jade

// Socket IO
// Function socket io yang berfungsi untuk menerima dan mengirim (emit) pesan
io.on('connection',function(socket) {
  socket.on('chat:pesan',function(pesan) {
    io.emit('chat:pesan',pesan);
  })
});

http.listen(app.get('port'),function() {
  console.log('Server running on port ' + app.get('port'));
});
// Http Listen sebagai log status di npm dan juga agar bisa diakses

/*Fungsi file ini adalah sebagai server websocket atau node js*/
