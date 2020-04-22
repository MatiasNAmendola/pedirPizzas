'use strict';

const orderMetadataManager = require('../providers/orderMetadataManager');
// const AWSXRay = require('aws-xray-sdk');

module.exports.prepararPedido = (event, context, callback) => {
    console.log('Preparar pedido fue llamada');

    const record = event.Records[0];
    const order = JSON.parse(record.body);
    /*
        // link: https://github.com/aws/aws-xray-sdk-node/issues/208
       // Recover the trace context from the trace header
       const headerString = record.attributes.AWSTraceHeader;
       const traceData = AWSXRay.utils.processTraceData(headerString);

       // traceData.Root // trace id or null
       // traceData.Parent // id of the parent segment or subsegment or nil
       // traceData.Sampled // "0" means not sampled

       const segment = new AWSXRay.Segment("SQS", traceData.Root, traceData.Parent);
       delete segment.service;
       segment.origin = "AWS::SQS";
       segment.inferred = true;
       segment.addPluginData({
           operation: "SendEvent",
           region: record.awsRegion,
           request_id: context.awsRequestId,
           queue_url: record.eventSourceARN
       });

       // AWSXRay.middleware.resolveSampling(traceData, segment);
       //AWSXRay.utils.LambdaUtils.populateTraceData(segment, process.env._X_AMZN_TRACE_ID);
    */

    orderMetadataManager
        .saveCompletedOrder(order)
        .then(data => {
            // segment.close();
            callback();
        })
        .catch(error => {
            // segment.close();
            callback(error);
        });
};
