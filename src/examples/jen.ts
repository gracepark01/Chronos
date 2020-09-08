/* eslint-disable */
// import { v4 } from 'uuid';
import { MockTracer, SpanOptions } from '../index';

// const flag = 1;
// const parentUUID = v4().slice(0, 18).replace(/-/g, '');
// const childUUID = v4().slice(0, 18).replace(/-/g, '');
console.log('\nRunning demo...\n');

const tracer = new MockTracer();

console.log('Starting parentSpan.');

const parentSpanOptions: SpanOptions = {
 startTime: Math.round(new Date().getTime()/1000),
};
const parentSpan = tracer.startSpan('parent_span', parentSpanOptions);

// inject headers
// const parentHeaders = {
  // 'x-request-id',
  // 'x-b3-traceid': parentUUID,
  // 'x-b3-spanid': childUUID,
  // 'x-b3-parentspanid': parentUUID,
  // 'x-b3-sampled',
  // 'x-b3-flags': flag,
  // 'x-ot-span-context',
  // 'x-variant-id'
// };
// tracer.inject(parentSpan.context(), FORMAT_HTTP_HEADERS, parentHeaders)
parentSpan.setBaggageItem('bob', 'poop'); // add baggage items (key value pairs copied into evey child of associated span)

parentSpan.setTag('bob', 'poop');
parentSpan.setTag('stella', 'awesome');

console.log('Waiting to start child...');
setTimeout(() => {
    console.log('Starting child span.');
    const childSpan = tracer.startSpan('child_span', { childOf: parentSpan });
    childSpan.setTag('grace', 'amazing');
    childSpan.setTag('pat', 'lovely');
    childSpan.log({state: 'waiting'}, Date.now());

    console.log('Waiting...');
    setTimeout(() => {
        console.log('Finishing childSpan and parentSpan.');
        childSpan.log({state: 'done' }, Date.now());
        childSpan.finish();
        parentSpan.finish();
        console.log('\nSpans:');
      const report = tracer.report(); // Print some information about the two spans. Note the `report` method is specific to the MockTracer implementation and is not part of the tracing API.
        for (const span of report.spans) {
            console.log('=====> Span Information: ', span.debug());
            // save to database
            // write into a local json file or txt file
        }
    }, 500);
}, 1000);
