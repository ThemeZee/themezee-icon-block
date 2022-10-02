/**
 * External dependencies
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

/**
 * Internal dependencies
 */
import { faSolid } from './icons';

const solidIcons = faSolid.map(i => {
	const icon = `fa-solid fa-${i}`;
	return {
		name: i,
		icon: <FontAwesomeIcon icon={ icon } />,
		library: 'fa-solid',
	}
});

wp.domReady( () => {

	function addFontAwesomeIcons( icons ) {
		return [].concat( icons, solidIcons );
	}

	wp.hooks.addFilter(
		'themezeeAdvancedIconBlock.icons',
		'themezee/advanced-icon-block/fa-solid',
		addFontAwesomeIcons
	);
} );
