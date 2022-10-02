 /**
 * Internal dependencies
 */
import { iconsOutlined } from './icons';

wp.domReady( () => {

	function addMaterialIcons( icons ) {
		return [].concat( icons, iconsOutlined );
	}

	wp.hooks.addFilter(
		'themezeeAdvancedIconBlock.icons',
		'themezee/advanced-icon-block/material-outlined',
		addMaterialIcons
	);
} );
