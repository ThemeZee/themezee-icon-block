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
import { icons as faIcons } from './fa-regular';
import { icons as wordPressIcons } from './wordpress';

const icons = [].concat( faIcons, wordPressIcons );

// Allow third parties to add their own icon types via filter.
export function getIcons() {
	return applyFilters( 'themezeeAdvancedIconBlock.icons', icons );
}

const sets = [
	{
		name: '__all',
		title: __( 'All Icons' ),
	},
	{
		name: 'fa-brands',
		title: __( 'Font Awesome (Brands)' ),
		scriptId: 'themezee-advanced-icon-block-fa-brands',
		scriptUrl: 'http://localhost/wp-content/plugins/advanced-icon-block/build/fa-brands/index.js',
	},
	{
		name: 'fa-regular',
		title: __( 'Font Awesome (Regular)' ),
	},
	{
		name: 'fa-solid',
		title: __( 'Font Awesome (Solid)' ),
		scriptId: 'themezee-advanced-icon-block-fa-solid',
		scriptUrl: 'http://localhost/wp-content/plugins/advanced-icon-block/build/fa-solid/index.js',
	},
	{
		name: 'material-filled',
		title: __( 'Material Icons (Filled)' ),
		scriptId: 'themezee-advanced-icon-block-material-filled',
		scriptUrl: 'http://localhost/wp-content/plugins/advanced-icon-block/build/material-filled/index.js',
	},
	{
		name: 'material-outlined',
		title: __( 'Material Icons (Outlined)' ),
		scriptId: 'themezee-advanced-icon-block-material-outlined',
		scriptUrl: 'http://localhost/wp-content/plugins/advanced-icon-block/build/material-outlined/index.js',
	},
	{
		name: 'wordpress',
		title: __( 'WordPress' ),
	},
];

export function getIconSets() {
	return sets;
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
