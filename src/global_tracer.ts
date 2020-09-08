import Tracer from './tracer';

const noopTracer = new Tracer();
let _globalTracer: Tracer | null = null;

// Acts a bridge to the global tracer that can be safely called before the global tracer is initialized
// The purpose of the delegation is to avoid the sometimes nearly intractible initialization order problems that can arise in applications with a complex set of dependencies
class GlobalTracerDelegate extends Tracer {
    startSpan(): any {
        const tracer = _globalTracer || noopTracer;
        return tracer.startSpan.apply(tracer, arguments);
    }
    inject(): any {
        const tracer = _globalTracer || noopTracer;
        return tracer.inject.apply(tracer, arguments);
    }
    extract(): any {
        const tracer = _globalTracer || noopTracer;
        return tracer.extract.apply(tracer, arguments);
    }
}

const globalTracerDelegate = new GlobalTracerDelegate();

// Set the global Tracer. The behavior is undefined if this function is called more than once
export function initGlobalTracer(tracer: Tracer): void {
    _globalTracer = tracer;
}

// Returns the global tracer
export function globalTracer(): Tracer {
  return globalTracerDelegate; // Since the global tracer is largely a convenience, as the user can always create their own tracers, the delegate is used to give the added convenience of not needing to worry about initialization order
}
