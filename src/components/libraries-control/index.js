/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
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
		<BaseControl
			className="wp-block-themezee-icon__libraries-control"
			help={ __( 'Choose the available icon sets. For performance reasons, do not enable all of them.', 'themezee-icon-block' ) }
		>
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
						help={ showLoadingText ? __( 'Icon Set is loaded...', 'themezee-icon-block' ) : '' }
					/>
				);
			} ) }
		</BaseControl>
	);
}
