var Invoice = {
  attributes: {

    /**
     * Amount that has to be paid.
     * Depending on the invoice type this value is in either bitcoins or cash.
     */
    amount: 'float',

    /**
     * The destination address created for this invoice (destination wallet to submit payments to).
     */
    address: 'string',

    /**
     * Type of invoice.
     *  - purchase  Customer is buying bitcoins
     *  - sale      Customer is selling bitcoins
     */
    type: 'string',

    /**
     * The status of the payment.
     *
     *  Failed        The payment has failed due to timeout or other issue.
     *  Pending       We've received zero attempts to pay the invoice.
     *  Partial       We've only received a part of the payment so far. [type="sale" only]
     *  Acknowledged  The first confirmation has come through. [type="sale" only]
     *  Finalized     The payment was finalized. (for bitcoins this means we've reached n confirmations).
     */
    status: {
      type: 'string',
      defaultsTo: 'pending'
    },

    /**
     * When the invoice has been created.
     */
    created: {
      type: 'datetime'
    },

    /**
     * Holds when this invoice was last updated.
     */
    updated: {
      type: 'datetime'
    },

    /**
     * All payments made for this invoice. Each payment is an object, used to verify a complete payment.
     * The invoice is considered "paid" when all payments equal or exceed the "amount",
     * and are confirmed at least n times, n being the configured amount of confirmations required.
     *
     *  {
     *    created : 'datetime'
     *    confirmed : 'boolean',
     *    amount : 'float'
     *  }
     */
    payments: {
      type: 'array',
      defaultsTo: []
    }
  }
};

module.exports = Invoice;
