'use strict';

const orderMetadataManager = require('../providers/orderMetadataManager');

module.exports.prepararPedido = (event, context, callback) => {
    console.log('Preparar pedido fue llamada');

    const order = JSON.parse(event.Records[0].body);

    orderMetadataManager
        .saveCompletedOrder(order)
        .then(data => {
            callback();
        })
        .catch(error => {
            callback(error);
        });
};
