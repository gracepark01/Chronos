import * as tracing from '../index';
import MockSpan from './mock_span';

/**
 * Tracing Context implementation designed for use in
 * unit tests.
 */
export class MockContext extends tracing.SpanContext {

    //------------------------------------------------------------------------//
    // MockContext-specific
    //------------------------------------------------------------------------//

    private _span: MockSpan;

    constructor(span: MockSpan) {
        super();
        // Store a reference to the span itself since this is a mock tracer
        // intended to make debugging and unit testing easier.
        this._span = span;
    }

    span(): MockSpan {
        return this._span;
    }
}

export default MockContext;
