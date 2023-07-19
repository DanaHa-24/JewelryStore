// Socket.io 
const socket = io('http://localhost:5000');

$('#send-btn').addClass("btn btn-primary");
$('#send-btn').on('click', sendMessage);

// Send the message 
function sendMessage() {
  const input = $('#comments-messageInput');
  const message = input.val().trim();

  if (message !== '') {
    socket.emit('message', message);
    input.val('');
  }
}

// Add the new comment to the list
function displayMessage(message) {
  const messageList = $('#comments-messageList');
  const listItem = $('<li></li>').attr('id', 'comments-message').text(message);
  messageList.append(listItem);
}

socket.on('message', function (data) {
  displayMessage(data);
});
