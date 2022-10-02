 /**
 * Internal dependencies
 */
import { iconsFilled } from './icons';

wp.domReady( () => {

	function addMaterialIcons( icons ) {
		return [].concat( icons, iconsFilled );
	}

	wp.hooks.addFilter(
		'themezeeAdvancedIconBlock.icons',
		'themezee/advanced-icon-block/material-filled',
		addMaterialIcons
	);
} );
