
// TODO: Move mock-tracer to its own NPM package once it is complete and tested.
import * as tracing from '../index';
import MockContext from './mock_context';
import MockReport from './mock_report';
import MockSpan from './mock_span';

/**
 * tracing Tracer implementation designed for use in unit tests.
 */
export class MockTracer extends tracing.Tracer {

    private _spans: MockSpan[];

    //------------------------------------------------------------------------//
    // tracing implementation
    //------------------------------------------------------------------------//

    protected _startSpan(name: string, fields: tracing.SpanOptions): MockSpan {
        // _allocSpan is given it's own method so that derived classes can
        // allocate any type of object they want, but not have to duplicate
        // the other common logic in startSpan().
        const span = this._allocSpan();
        span.setOperationName(name);
        this._spans.push(span);

        if (fields.references) {
            for (const ref of fields.references) {
                span.addReference(ref);
            }
        }

        // Capture the stack at the time the span started
        span._startStack = new Error().stack;
        return span;
    }

    protected _inject(span: MockContext, format: any, carrier: any): never {
        throw new Error('NOT YET IMPLEMENTED');
    }

    protected _extract(format: any, carrier: any): never {
        throw new Error('NOT YET IMPLEMENTED');
    }

    //------------------------------------------------------------------------//
    // MockTracer-specific
    //------------------------------------------------------------------------//

    constructor() {
        super();
        this._spans = [];
    }

    private _allocSpan(): MockSpan {
        return new MockSpan(this);
    }

    /**
     * Discard any buffered data.
     */
    clear(): void {
        this._spans = [];
    }

    /**
     * Return the buffered data in a format convenient for making unit test
     * assertions.
     */
    report(): MockReport {
        return new MockReport(this._spans);
    }
}

export default MockTracer;
