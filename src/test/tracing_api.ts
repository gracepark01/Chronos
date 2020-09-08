
import { expect } from 'chai';
import * as tracing from '../index';

export function tracingAPITests(): void {
    describe('tracing API', () => {
        let tracer: tracing.Tracer;
        let span: tracing.Span;
        beforeEach(() => {
            tracer = new tracing.Tracer();
            span = tracer.startSpan('test-span');
        });

        describe('Constants', () => {
            const constStrings: (keyof typeof tracing)[] = [
                'FORMAT_TEXT_MAP',
                'FORMAT_BINARY',
                'FORMAT_HTTP_HEADERS',
                'REFERENCE_CHILD_OF',
                'REFERENCE_FOLLOWS_FROM'
            ];
            for (const name of constStrings) {
                it(name + ' should be a constant string', () => {
                    expect(tracing[name]).to.be.a('string');
                });
            }
        });

        describe('Standalone functions', () => {
            const funcs: (keyof typeof tracing)[] = [
                'childOf',
                'followsFrom',
                'initGlobalTracer',
                'globalTracer'
            ];
            for (const name of funcs) {
                it(name + ' should be a function', () => {
                    expect(tracing[name]).to.be.a('function');
                });
            }

            describe('global tracer', () => {
                const dummySpan = new tracing.Span();

                afterEach(() => {
                  tracing.initGlobalTracer(new tracing.Tracer());
                });

                it('should use the global tracer', () => {
                    tracing.initGlobalTracer(new TestTracer());
                    const tracer = tracing.globalTracer();
                    const span = tracer.startSpan('test');
                    expect(span).to.equal(dummySpan);
                });

                class TestTracer extends tracing.Tracer {
                  protected _startSpan(name: string, fields: tracing.SpanOptions): tracing.Span {
                      return dummySpan;
                  }
                }
            });
        });

        describe('Tracer', () => {
            it('should be a class', () => {
                expect(new tracing.Tracer()).to.be.an('object');
            });
        });

        describe('Span', () => {
            it('should be a class', () => {
                expect(span).to.be.an('object');
            });
        });

        describe('SpanContext', () => {
            it('should be a class', () => {
                const spanContext = span.context();
                expect(spanContext).to.be.an('object');
            });
        });

        describe('Reference', () => {
            it('should be a class', () => {
                const ref = new tracing.Reference(tracing.REFERENCE_CHILD_OF, span.context());
                expect(ref).to.be.an('object');
            });
        });

        describe('BinaryCarrier', () => {
            it('should set binary data as a field called "buffer"', () => {
                const buffer = new Float64Array(10);
                const ref = new tracing.BinaryCarrier(buffer);
                expect(ref.buffer).to.equal(buffer);
            });
        });
    });
}

export default tracingAPITests;
