/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

 /**
 * Internal dependencies
 */
import { iconsOutlined } from './icons';

wp.domReady( () => {

	function addMaterialIcons( icons ) {
		return [].concat( icons, iconsOutlined );
	}

	addFilter(
		'themezeeAdvancedIconBlock.icons',
		'themezee/advanced-icon-block/material-outlined',
		addMaterialIcons
	);
} );
