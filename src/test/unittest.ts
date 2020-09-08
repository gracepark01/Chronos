require('source-map-support').install(); // Ensure the stack trace lines numbers are correct on errors

import apiCompatibilityChecks from './api_compatibility';
import mocktracerImplementationTests from './mocktracer_implementation';
import noopImplementationTests from './noop_implementation';
import tracingAPITests from './tracing_api';
import {MockTracer, Tracer} from '../index.js';

mocktracerImplementationTests ();
apiCompatibilityChecks(() =>  new MockTracer (), {skipInjectExtractChecks: true, skipBaggageChecks: true} );
noopImplementationTests(); // Run the tests on the default no-op Tracer.
apiCompatibilityChecks(() => new Tracer(), { skipBaggageChecks: true }); // Run the api conformance tests on the default no-op Tracer.
tracingAPITests(); // Basic unittests for tracing
