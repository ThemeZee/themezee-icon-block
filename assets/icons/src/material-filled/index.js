 /**
 * Internal dependencies
 */
import { iconsFilled } from './icons';

wp.domReady( () => {

	function addMaterialIcons( icons ) {
		return [].concat( icons, iconsFilled );
	}

	wp.hooks.addFilter(
		'themezeeIconBlock.icons',
		'themezee/icon-block/material-filled',
		addMaterialIcons
	);
} );
