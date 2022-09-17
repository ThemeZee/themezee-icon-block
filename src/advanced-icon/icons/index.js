/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
 
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { icons as faIcons } from './fontawesome';
import { icons as materialIcons } from './material';
import { icons as wordPressIcons } from './wordpress';

const icons = {
	icons: [].concat( faIcons, materialIcons, wordPressIcons ),
	libraries: [
		{
			name: '__all',
			title: __( 'All Icons' ),
		},
		{
			name: 'fa-brands',
			title: __( 'Font Awesome (Brands)' ),
		},
		{
			name: 'fa-regular',
			title: __( 'Font Awesome (Regular)' ),
		},
		{
			name: 'fa-solid',
			title: __( 'Font Awesome (Solid)' ),
		},
		{
			name: 'material-filled',
			title: __( 'Material Icons (Filled)' ),
		},
		{
			name: 'material-outlined',
			title: __( 'Material Icons (Outlined)' ),
		},
		{
			name: 'wordpress',
			title: __( 'WordPress' ),
		},
	],
};

// Allow third parties to add their own icon types via filter.
export function getIcons() {
	return applyFilters( 'iconBlock.icons', icons );
}

// Allow third parties to add their own icon types via filter.
export function getSingleIcon( iconName = '', iconLibrary = 'wordpress' ) {
	// Return early if icon name is empty.
	if ( iconName === '' ) {
		return '';
	}

	const iconsObject = getIcons();
	const icons = iconsObject.icons;
	const findIcon = icons.filter( ( i ) => ( i.name === iconName && i.library === iconLibrary ) );
	const selectedIcon = ! isEmpty( findIcon ) ? findIcon[ 0 ].icon : null;

	// Return if icon is missing.
	if ( ! selectedIcon ) {
		return '';
	}

	// Make sure all icons have aria-hidden and focusable attributes.
	const iconSVG = {
		...selectedIcon,
		props: { ...selectedIcon.props, 'aria-hidden': true, 'focusable': false },
	};

	return iconSVG;
}
