/**
 * External dependencies
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fab, far, fas);

/**
 * Internal dependencies
 */
import { faBrands } from './brands';
import { faRegular } from './regular';
import { faSolid } from './solid';

const brandIcons = faBrands.map(i => {
	const icon = `fa-brands fa-${i}`;
	return {
		name: i,
		icon: <FontAwesomeIcon icon={ icon } />,
		library: 'fa-brands',
	}
});

const regularIcons = faRegular.map(i => {
	const icon = `fa-regular fa-${i}`;
	return {
		name: i,
		icon: <FontAwesomeIcon icon={ icon } />,
		library: 'fa-regular',
	}
});

const solidIcons = faSolid.map(i => {
	const icon = `fa-solid fa-${i}`;
	return {
		name: i,
		icon: <FontAwesomeIcon icon={ icon } />,
		library: 'fa-solid',
	}
});

export const icons = [].concat( brandIcons, regularIcons, solidIcons );
