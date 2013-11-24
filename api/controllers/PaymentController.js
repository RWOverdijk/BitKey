module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PaymentController)
   */
  _config: {
    blueprints: {
      rest: false,
      actions: false
    }
  },

  create: function(req, res) {
    var invoiceData = {
        amount: req.param('amount'),
        type: req.param('type')
    };

    PaymentService.createInvoice(invoiceData, function(result) {
      if (result.status) {
        res.send({ address: result.address });
      } else {
        res.send({error: result.message});
      }
    });


  }
};
