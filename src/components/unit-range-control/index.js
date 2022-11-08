/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
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
		min = {},
		max = {},
		step = {},
		units = undefined,
	} = props;

	const [ unit, setUnit ] = useState( parseQuantityAndUnitFromRawValue( value )[ 1 ] );
	const numericValue = parseQuantityAndUnitFromRawValue( value )[ 0 ];

	const minValues = {
		'px': 0,
		'%': 0,
		'em': 0,
		'rem': 0,
		'vw': 0,
		'vh': 0,
		...min,
	};

	const maxValues = {
		'px': 800,
		'%': 100,
		'em': 50,
		'rem': 50,
		'vw': 100,
		'vh': 100,
		...max,
	};

	const steps = {
		'px': 1,
		'%': 1,
		'em': 0.1,
		'rem': 0.1,
		'vw': 0.1,
		'vh': 0.1,
		...step,
	};

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
					{...( units ? { units: units } : {} ) }
				/>
				<RangeControl
					label={ label }
					hideLabelFromVision
					className="themezee-components-unit-range-control__range-control"
					value={ numericValue ?? '' }
					min={ minValues[unit] }
					max={ maxValues[unit] }
					step={ steps[unit] }
					withInputField={ false }
					onChange={ handleSliderChange }
				/>
			</div>
		</fieldset>
	);
}
