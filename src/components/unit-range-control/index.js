/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSetting } from '@wordpress/block-editor';
import {
	BaseControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Control to display unit range options.
 *
 * @param {Object}   props          Component props.
 * @param {Function} props.onChange Callback to handle onChange.
 * @param {String}   props.value    Value
 *
 * @return {WPElement}              Custom unit range control.
 */
export default function UnitRangeControl( props ) {
	const {
		label = '',
		value,
		onChange,
		min = 0,
		max = 100,
	} = props;

	const [ unit, setUnit ] = useState( parseQuantityAndUnitFromRawValue( value )[ 1 ] );
	const numericValue = parseQuantityAndUnitFromRawValue( value )[ 0 ];

	console.log( unit, numericValue );

	const handleSliderChange = ( next ) => {
		onChange( next !== undefined ? `${ next }${ unit }` : undefined );
	};

	return (
		<fieldset className="themezee-components-unit-range-control">
			<BaseControl.VisualLabel as="legend">
				{ label }
			</BaseControl.VisualLabel>
			<div className="themezee-components-unit-range-control__wrapper">
				<UnitControl
					isResetValueOnUnitChange
					value={ value }
					onChange={ onChange }
					onUnitChange={ setUnit }
				/>
				<RangeControl
					label={ label }
					hideLabelFromVision
					className="themezee-components-unit-range-control__range-control"
					value={ numericValue ?? '' }
					min={ min }
					max={ max }
					withInputField={ false }
					onChange={ handleSliderChange }
				/>
			</div>
		</fieldset>
	);
}
