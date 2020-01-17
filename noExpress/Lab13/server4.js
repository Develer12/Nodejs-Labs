const udp = require('dgram');

const PORT = 4000;
let server = udp.createSocket('udp4')

server.on('message', (msg, info)=>
  {
    MsgBuff=msg.toString();
    console.log(`Msg ${info.address}:${info.port} = ${MsgBuff}`);
    MsgBuff= `ECHO:${MsgBuff}`;
    server.send(MsgBuff, info.port, info.address, (err)=>
    {
      if(err) server.close();
      else console.log('Sended');
    });
  })
  .on('listening', ()=>
  {
    console.log(`Server PORT: ${server.address().port}`);
    console.log(`Server Address: ${server.address().address}`);
    console.log(`Server IPv: ${server.address().family}`);
  })
  .on('close', ()=>console.log('Server CLOSED'))
  .on('error', (err)=>{console.log('Error: '+err); server.close();});

server.bind(PORT);
