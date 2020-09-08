/* eslint-disable import/no-extraneous-dependencies */

import * as tracing from '../index';
import Reference from '../reference';
import MockContext from './mock_context';
import MockTracer from './mock_tracer';

interface Log {
    fields: { [key: string]: any };
    timestamp?: number;
}

export interface DebugInfo {
    uuid: string;
    operation: string;
    millis: [number, number, number];
    tags?: { [key: string]: any };
}

/**
 * tracing Span implementation designed for use in unit tests.
 */
export class MockSpan extends tracing.Span {

    private _operationName: string;
    private _tags: { [key: string]: any };
    private _logs: Log[];
    _finishMs: number;
    private _mockTracer: MockTracer;
    private _uuid: string;
    private _startMs: number;
    _startStack?: string;

    //------------------------------------------------------------------------//
    // tracing implementation
    //------------------------------------------------------------------------//

    protected _context(): MockContext {
        return new MockContext(this);
    }

    protected _setOperationName(name: string): void {
        this._operationName = name;
    }

    protected _addTags(set: { [key: string]: any }): void {
        const keys = Object.keys(set);
        for (const key of keys) {
            this._tags[key] = set[key];
        }
    }

    protected _log(fields: { [key: string]: any }, timestamp?: number): void {
        this._logs.push({
            fields,
            timestamp
        });
    }

    protected _finish(finishTime?: number): void {
        this._finishMs = finishTime || Date.now();
    }

    //------------------------------------------------------------------------//
    // MockSpan-specific
    //------------------------------------------------------------------------//

    constructor(tracer: MockTracer) {
        super();
        this._mockTracer = tracer;
        this._uuid = this._generateUUID();
        this._startMs = Date.now();
        this._finishMs = 0;
        this._operationName = '';
        this._tags = {};
        this._logs = [];
    }

    uuid(): string {
        return this._uuid;
    }

    operationName(): string {
        return this._operationName;
    }

    durationMs(): number {
        return this._finishMs - this._startMs;
    }

    tags(): { [key: string]: any } {
        return this._tags;
    }

    tracer(): tracing.Tracer {
        return this._mockTracer;
    }

    private _generateUUID(): string {
        const p0 = `00000000${Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)}`.substr(-8);
        const p1 = `00000000${Math.abs((Math.random() * 0xFFFFFFFF) | 0).toString(16)}`.substr(-8);
        return `${p0}${p1}`;
    }

    addReference(ref: Reference): void {
    }

    /**
     * Returns a simplified object better for console.log()'ing.
     */
    debug(): DebugInfo {
        const obj: any = {
            uuid      : this._uuid,
            operation : this._operationName,
            start     : new Date(this._startMs*1000),
            end       : new Date(this._finishMs*1000),
            // millis    : [this._finishMs - this._startMs, this._startMs, this._finishMs],
            duration  : this.durationMs(),
            tags      : this._tags,
            logs      : this._logs,
        };
        // if (Object.keys(this._tags).length) {
        //   obj.tags = this._tags;
        // };
      
        if (Object.keys(this._logs).length) {
          obj.logs = [];
          let logs = obj.logs;
          for (let obj of this._logs) {
            obj.fields.time = obj.timestamp;
            logs.push(obj.fields)
          }
        };
        return obj;
    }
}

export default MockSpan;
