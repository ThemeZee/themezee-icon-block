/**
 * External dependencies
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fab);

/**
 * Internal dependencies
 */
import { faBrands } from './icons';

const brandIcons = faBrands.map(i => {
	const icon = `fa-brands fa-${i}`;
	return {
		name: i,
		icon: <FontAwesomeIcon icon={ icon } />,
		library: 'fa-brands',
	}
});

wp.domReady( () => {

	function addFontAwesomeIcons( icons ) {
		return [].concat( icons, brandIcons );
	}

	wp.hooks.addFilter(
		'themezeeIconBlock.icons',
		'themezee/icon-block/fa-brands',
		addFontAwesomeIcons
	);
} );
