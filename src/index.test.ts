import { describe, expect, jest, test } from '@jest/globals';

import clonedeep from '.';

describe( 'clonedeep(...)', () => {
	test( 'produces exact clone for commonly used types', () => {
		const value = {
			boolean: true,
			number: 33,
			object: {
				a: 1,
				b:2,
				c:3
			}
		};
		const clone = clonedeep( value );
		expect( clone ).not.toBe( value );
		expect( clone ).toStrictEqual( value );
	} );
	test( 'produces exact clone for recognized web api instances ', () => {
		const value = {
			birth: {
				date: new Date( '1952-09-05' ),
				place: { city: 'Prague' }
			},
			null: null,
			regexCount: /[1-9][0-9]*/g,
			undefined: undefined
		};
		const clone = clonedeep( value );
		expect( clone.birth.date ).not.toBe( value.birth.date );
		expect( clone.birth.place ).not.toBe( value.birth.place );
		expect( clone.regexCount ).not.toBe( value.regexCount );
		expect( clone ).not.toBe( value );
		expect( clone ).toStrictEqual( value );
	} );
	test( 'will not clone but will return unrecognized instances not implementing either `clone` or `cloneNode` methods', () => {
		class Test {};
		const value = { testing: { test: new Test() } };
		const clone = clonedeep( value );
		expect( clone.testing.test ).toBe( value.testing.test ); // not cloned: returned as is
		expect( clone ).not.toBe( value );
		expect( clone ).toStrictEqual( value );
	} );
	test( 'accepts a customizer', () => {
		expect( clonedeep({
			a: 'asci',
			b: true,
			n: 33,
			s: 'string'
		}, v => {
			if( typeof v === 'string' ) { return true }
		}) ).toEqual({
			a: true,
			b: true,
			n: 33,
			s: true
		});
	} );
	describe( 'cloning unrecognizable instance', () => {
		const runWith = ( value, cloneWatcher ) => {
			const clone = clonedeep( value );
			expect( clone.testing.test ).not.toBe( value.testing.test );
			expect( cloneWatcher ).toHaveBeenCalled();
			expect( clone ).not.toBe( value );
			expect( clone ).toStrictEqual( value );
		};
		test( 'using its `clone` method', () => {
			const cloneWatcher = jest.fn();
			class Test {
				clone() {
					cloneWatcher();
					return new Test();
				}
			};
			runWith({ testing: { test: new Test() } }, cloneWatcher );
		} );
		test( 'using its `cloneNode` method', () => {
			const cloneWatcher = jest.fn();
			class Test {
				cloneNode() {
					cloneWatcher();
					return new Test();
				}
			};
			runWith({
				testing: {
					test: new Test()
				}
			}, cloneWatcher );
		} );
	} );
} );