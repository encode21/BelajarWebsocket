'use strict';

var socket = io();
var DataChatKirim = {};//Declare var DataChatKirim sebagai object

$(document).ready(function() {
  // Mengirim data pesan
  $('#kirim').on('click', function() {
    DataChatKirim.nama = $('#nama').val();
    DataChatKirim.pesan = $('#pesan').val();

    socket.emit('chat:pesan', DataChatKirim);//emit/kirim ke websocket
    // Kemudian di reset formnya
    $('#nama').val('');
    $('#pesan').val('');
  });
});

// Jika ada chat masuk
socket.on('chat:pesan', function(DataChat) {
  if (DataChatKirim.nama === DataChat.nama) {
    // Jika nama pengirim dan data nama yang sudah ada sama maka posisi chat message dia berada di kanan
    $('#listPesan').prepend($('<li class="list-group-item text-right">').text(DataChat.nama + ' : ' + DataChat.pesan));
  } else {
    $('#listPesan').prepend($('<li class="list-group-item text-left">').text(DataChat.nama + ' : ' + DataChat.pesan));
  }
});
