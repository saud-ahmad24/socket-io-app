const { Server } = require("socket.io");
const io = new Server({
    cors: {
        origin: '*',
    }
});
module.exports = io
io.on('connection', client => {
    console.log('connected :>> ');
    client.on('event', data => { 
        console.log("event",data)
     });
     client.on('init', data => { 
        console.log("init",data);
        client.join(data.channelId)
     });
     client.on('message', data => {
        console.log("message",data)
        sendMessage(data)
     });
    client.on('disconnect', () => { 
        console.log('disconnected :>> ');
     });
});
const sendMessage = (data) => {
    console.log("data",data);
    io.in(data.sendTo).emit('message', data.message);
}