 /**
 * Internal dependencies
 */
import { iconsOutlined } from './icons';

wp.domReady( () => {

	function addMaterialIcons( icons ) {
		return [].concat( icons, iconsOutlined );
	}

	wp.hooks.addFilter(
		'themezeeIconBlock.icons',
		'themezee/icon-block/material-outlined',
		addMaterialIcons
	);
} );
