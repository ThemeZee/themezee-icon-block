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

export const icons = faRegular.map(i => {
	const icon = `fa-regular fa-${i}`;
	return {
		name: i,
		icon: <FontAwesomeIcon icon={ icon } />,
		library: 'fa-regular',
	}
});
