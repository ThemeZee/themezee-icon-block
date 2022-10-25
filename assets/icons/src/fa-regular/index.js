/**
 * External dependencies
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(far);

/**
 * Internal dependencies
 */
import { faRegular } from './icons';

const regularIcons = faRegular.map(i => {
	const icon = `fa-regular fa-${i}`;
	return {
		name: i,
		icon: <FontAwesomeIcon icon={ icon } />,
		library: 'fa-regular',
	}
});

wp.domReady( () => {

	function addFontAwesomeIcons( icons ) {
		return [].concat( icons, regularIcons );
	}

	wp.hooks.addFilter(
		'themezeeIconBlock.icons',
		'themezee/icon-block/fa-regular',
		addFontAwesomeIcons
	);
} );
