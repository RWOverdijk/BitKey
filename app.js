//var BitKeyBlockChain = require('bitkey-blockchain');
////
//var blockchain = new BitKeyBlockChain({
//  walletIdentifier: 'fdda399d-de9a-49d2-be25-42faf07a1e2d',
//  walletPassword: '$LW_rw091!',
//  bitcoinAddress: '16PHW6dx6nEWdFKSTKM9TF9NcmPHxaksic',
//  projectSiteRoot: 'http://www.bitkey.nl'
//});
//
//blockchain.sendBitcoins('1DNFxuMABFjpuEs4LyBHwCprESno2atqXA', 0.0002, {
//  note : 'Purchased bitcoins from BitKey.'
//}, function(response) {
//  console.log(response);
//});
//
//return;

//blockchain.createReceivingAddress('/test', function(data) {
//  console.log(data);
//});

// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);
