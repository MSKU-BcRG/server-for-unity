
var express = require('express');
var auth_symbol = require('./auth_symbol.json');
const {Web3} = require('web3');
var app = express();

let web3, contract, provider;

    
async function initializeContract() {
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = auth_symbol.networks[networkId];
  const contract = new web3.eth.Contract(
    auth_symbol.abi,
    deployedNetwork.address
  );
  return [web3, contract];
}
 
   
app.get('/checkSymbol', async function (req, res) {
      let symbolID = req.query.symbolid;
      let userID = req.query.userid;
      const symbolExists = await contract.methods
      .checkSymbol(userID, symbolID)
      .call();
      res.end(symbolExists.toString());
})

app.get('/setSymbol', async function (req, res) {
    let symbolID = req.query.symbolid;
    let userID = req.query.userid;
    const symbolExists = await contract.methods
      .setSymbol(userID, symbolID)
      .send({ from: "your contract address"});
      res.end("SUCCESSFUL");
})

app.get('/userExists', async function (req, res) {
      let userID = req.query.userid;
      const symbolExists = await contract.methods
      .userExists(userID)
      .call();
      res.end(symbolExists.toString() );
})

var server = app.listen(8081, async function () {
    provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    [web3, contract] = await initializeContract();

   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
