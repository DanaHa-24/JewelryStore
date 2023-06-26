const WebSocket = require('websocket').server;
const http = require('http');

// Create HTTP server
const server = http.createServer(function(request, response) {
  // Process regular HTTP requests
  response.writeHead(404);
  response.end();
});

// Create WebSocket server
const wsServer = new WebSocket({
  httpServer: server
});

// Array to store connected WebSocket clients
const clients = [];

// WebSocket event handlers
wsServer.on('request', function(request) {
  // Accept the WebSocket connection
  const connection = request.accept(null, request.origin);

  // Add the connection to the clients array
  clients.push(connection);

  // WebSocket message event handler
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // Broadcast the received message to all connected clients
      const opinion = message.utf8Data;
      clients.forEach(function(client) {
        client.sendUTF(opinion);
      });
    }
  });

  // WebSocket close event handler
  connection.on('close', function() {
    // Remove the connection from the clients array
    const index = clients.indexOf(connection);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

// Start the server
server.listen(8082, function() {
  console.log('WebSocket server is listening on port 5000');
});
