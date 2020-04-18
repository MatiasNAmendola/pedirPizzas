'use strict';

const uuidv1 = require('uuid/v1');

const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const sqs = new AWS.SQS({ region: process.env.REGION });
const QUEUE_URL = process.env.PENDING_ORDER_QUEUE;

module.exports.hacerPedido = (event, context, callback) => {
    console.log('La función "hacerPedido" fué llamada!');

    const body = JSON.parse(event.body);

    const orderId = uuidv1();

    const order = {
        orderId: orderId,
        name: body.name,
        address: body.address,
        pizzas: body.pizzas,
        timestamp: Date.now(),
    };

    const params = {
        MessageBody: JSON.stringify(order),
        QueueUrl: QUEUE_URL,
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            sendResponse(500, err, callback);
        } else {
            console.log(`El pedido fue registrado con el número de orden ${orderId}`);

            const message = {
                orderId: orderId,
                messageId: data.MessageId,
            };

            sendResponse(200, message, callback);
        }
    });
};

function sendResponse(statusCode, message, callback) {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(message),
    };

    callback(null, response);
}
