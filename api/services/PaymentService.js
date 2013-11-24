var BitKeyBlockChain = require('bitkey-blockchain')
  , sails = require('sails')
  , bitcoinAddress = require('bitcoin-address');

function PaymentService() {
  this.blockchain = new BitKeyBlockChain(sails.config.bitkey);
};

PaymentService.prototype.createInvoice = function(invoiceDetails, callback) {

  invoiceDetails = invoiceDetails || {};

  // Check if we got an amount
  if (typeof invoiceDetails.amount === 'undefined') {
    return callback({
      status: false,
      message: 'Amount not supplied. This value is mandatory.'
    });
  }

  // Check if we have got a type
  if (typeof invoiceDetails.type === 'undefined') {
    return callback({
      status: false,
      message: 'Invoice type not supplied. This value is mandatory.'
    });
  }

  // Check if the invoice type is something that's allowed
  if (invoiceDetails.type !== 'purchase' && invoiceDetails.type !== 'sale') {
    return callback({
      status: false,
      message: 'Invalid type supplied.'
    });
  }

  // All data here, let's create an address.
  this.blockchain.createReceivingAddress('/confirm-transaction', function(responseData) {

    // The address that has been created for the customer.
    var receivingAddress = responseData.input_address;

    // Something went horribly wrong. @todo: Add logging, or alert notifications. Perhaps exceeded api limit?
    if (!bitcoinAddress.validate(receivingAddress)) {
      return callback({
        status: false,
        message: 'Invalid bitcoin address received from blockchain.'
      });
    }

    var invoiceData = {
      amount: parseFloat(invoiceDetails.amount.replace(",", ".")),
      address: receivingAddress,
      type: invoiceDetails.type
    };

    Invoice.create(invoiceData).done(function(entity) {
      return callback({
        status: true,
        address: receivingAddress
      });
    });

  });
};

module.exports = new PaymentService();
