const socket = io('http://localhost:5000');

$('#send-btn').on('click', sendMessage);

function sendMessage() {
  const input = $('#comments-messageInput');
  const message = input.val().trim();

  if (message !== '') {
    socket.emit('message', message);
    input.val('');
  }
}

function displayMessage(message) {
  const messageList = $('#comments-messageList');
  const listItem = $('<li></li>').attr('id', 'comments-message').text(message);
  messageList.append(listItem);
}

socket.on('message', function (data) {
  displayMessage(data);
});
