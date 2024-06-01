import type { CloneDeepWithCustomizer } from 'lodash';

import checkEligibility from './clonedeep-eligibility-check';

export type Customizer<T = unknown> = CloneDeepWithCustomizer<T>;

const cloneDeepWith = require( 'lodash.clonedeepwith' );

const noop = () => {};

const handleCloneables : CloneDeepWithCustomizer<unknown> = v => {
    if( v === null ) { return }
    if( typeof v === 'object' ) {
        if( 'clone' in v && typeof v.clone === 'function' ) { return v.clone() }
        if( 'cloneNode' in v && typeof v.cloneNode === 'function' ) { return v.cloneNode( true ) }
    }
}

function clone <T, R = T>(
    value : T ,
    customizer : CloneDeepWithCustomizer<T>
) : R {
    return cloneDeepWith( value, (
        value : unknown,
        key? : number | string,
        object? : T,
        stack? : unknown
    ) => {
        let r = customizer( value, key, object, stack );
        if( typeof r !== 'undefined' ) { return r }
        r = handleCloneables( value, key, object, stack );
        if( typeof r !== 'undefined' ) { return r }
        if( !checkEligibility( value ).isEligible ) { return value }
    });
}

function clonedeep <T, R = T>(
    value: T,
    customizer : CloneDeepWithCustomizer<T> = noop
) : R {
    return clone( value, customizer );
}

export default clonedeep;
