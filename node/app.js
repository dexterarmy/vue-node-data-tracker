const app = require('express')();
const http = require('http').createServer(app);
const fs = require("fs");
const io = require('socket.io')(http, {
  cors: {
    origins: ['*']
  }
});


io.on('connect', (socket) => {
  const data = fs.readFileSync('./data.json', 'utf8');
  socket.emit('initial', JSON.parse(data));

  socket.on('add-item', (data) => {
    const newItem = { id: Date.now(), name: data.name , data: data.data };
    const items = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    items.push(newItem); // Add to your data storage
    fs.writeFileSync('./data.json', JSON.stringify(items, null, 2), 'utf8');
    io.emit('initial', JSON.parse(fs.readFileSync('./data.json', 'utf8'))); 
  });

  socket.on('delete-item', (id) => {
    let items = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const newItems = items.filter((item) => item.id !== id);
    items = newItems;
    fs.writeFileSync('./data.json', JSON.stringify(items, null, 2), 'utf8');
    io.emit('initial', JSON.parse(fs.readFileSync('./data.json', 'utf8')));
  });

  socket.on('update-item', (item) => {
    let items = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const newItems = items.map((data) => {
      if(data.id === item.id){
        return item;
      }else{
        return data;
      }
    });
    items = newItems;
    fs.writeFileSync('./data.json', JSON.stringify(items, null, 2), 'utf8');
    io.emit('initial', JSON.parse(fs.readFileSync('./data.json', 'utf8')));
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});