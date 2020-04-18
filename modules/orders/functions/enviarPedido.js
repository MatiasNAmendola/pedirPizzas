'use strict';

const orderMetadataManager = require('../providers/orderMetadataManager');

module.exports.enviarPedido = (event, context, callback) => {
    console.log('enviarPedido fue llamada');

    const record = event.Records[0];

    if (record.eventName === 'INSERT') {
        console.log('deliverOrder');

        const orderId = record.dynamodb.Keys.orderId.S;

        orderMetadataManager
            .deliverOrder(orderId)
            .then(data => {
                console.log(data);
                callback();
            })
            .catch(error => {
                callback(error);
            });
    } else {
        console.log('is not a new record');
        callback();
    }
};
