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

const libraries = [
	{
		name: '__all',
		title: __( 'All Icons' ),
	},
	{
		name: 'fa-brands',
		title: __( 'Font Awesome (Brands)' ),
		scriptId: 'themezee-advanced-icon-block-fa-brands',
		scriptUrl: 'fa-brands/index.js',
	},
	{
		name: 'fa-regular',
		title: __( 'Font Awesome (Regular)' ),
	},
	{
		name: 'fa-solid',
		title: __( 'Font Awesome (Solid)' ),
		scriptId: 'themezee-advanced-icon-block-fa-solid',
		scriptUrl: 'fa-solid/index.js',
	},
	{
		name: 'material-filled',
		title: __( 'Material Icons (Filled)' ),
		scriptId: 'themezee-advanced-icon-block-material-filled',
		scriptUrl: 'material-filled/index.js',
	},
	{
		name: 'material-outlined',
		title: __( 'Material Icons (Outlined)' ),
		scriptId: 'themezee-advanced-icon-block-material-outlined',
		scriptUrl: 'material-outlined/index.js',
	},
	{
		name: 'wordpress',
		title: __( 'WordPress' ),
	},
];

export function getLibraries() {
	return libraries;
}
