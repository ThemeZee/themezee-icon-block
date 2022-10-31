/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, _n } from '@wordpress/i18n';
import {
	BaseControl,
	CheckboxControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { libraries } from '../../libraries';
import './style.scss';

export default function LibrariesControl( props ) {
	const {
		availableLibraries,
		enabledLibraries,
		isLoading,
		label,
		onChange,
	} = props;

	return (
		<fieldset className="themezee-components-libraries-control">
			<BaseControl.VisualLabel as="legend">
				{ label }
			</BaseControl.VisualLabel>
			<div className="themezee-components-libraries-control__wrapper">
				{ libraries.map( ( library ) => {
					// Return early for all icon libraries.
					if ( library.name === '__all' ) {
						return;
					}

					const showLoadingText = enabledLibraries.includes( library.name ) && ! availableLibraries.map( lib => lib.name ).includes( library.name );
					return (
						<CheckboxControl
							key={ library.name }
							label={ library.title }
							checked={ enabledLibraries.includes( library.name ) }
							onChange={ () => onChange( library.name ) }
							disabled={ isLoading }
							help={ showLoadingText ? __( 'Icon Set is loaded...' ) : '' }
						/>
					);
				} ) }
			</div>
		</fieldset>
	);
}
