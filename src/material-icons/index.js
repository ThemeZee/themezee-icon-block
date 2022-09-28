/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

 /**
 * Internal dependencies
 */
import { iconsFilled } from './filled';
import { iconsOutlined } from './outlined';

wp.domReady( () => {

	function addMaterialIcons( icons ) {
		const materialIcons = [].concat( iconsFilled, iconsOutlined );
		return [].concat( icons, materialIcons );
	}

	function addMaterialLibraries( libraries ) {
		const materialLibraries = [
			{
				name: 'material-filled',
				title: __( 'Material Icons (Filled)' ),
			},
			{
				name: 'material-outlined',
				title: __( 'Material Icons (Outlined)' ),
			},
		];

		return [].concat( libraries, materialLibraries );
	}

	addFilter(
		'themezeeAdvancedIconBlock.icons',
		'themezee/advanced-icon-block/material-icons',
		addMaterialIcons
	);

	addFilter(
		'themezeeAdvancedIconBlock.libraries',
		'themezee/advanced-icon-block/material-libraries',
		addMaterialLibraries
	);
} );
