/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

 /**
 * Internal dependencies
 */
import { iconsFilled } from './icons';

wp.domReady( () => {

	function addMaterialIcons( icons ) {
		return [].concat( icons, iconsFilled );
	}

	addFilter(
		'themezeeAdvancedIconBlock.icons',
		'themezee/advanced-icon-block/material-filled',
		addMaterialIcons
	);
} );
