let express = require('express');
let expressWs = require('express-ws');
let router = express.Router();
expressWs(router);

router.ws('/socketTest', function(ws, req) {
  //   console.log(req);
  try {
    ws.send(JSON.stringify({ type: 'title', msg: '欢迎进入305聊天室' }));
  } catch (e) {
    console.log(e);
  }
  ws.on('message', function(msg) {
    ws.send(JSON.stringify({ type: 'selfMsg', msg: msg }));
    ws.send(JSON.stringify({ type: 'sysMsg', msg: msg + ',爸爸' }));
  });
});
module.exports = router;
