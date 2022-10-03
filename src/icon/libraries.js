/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const libraries = [
	{
		name: '__all',
		title: __( 'All Icons' ),
	},
	{
		name: 'fa-brands',
		title: __( 'Font Awesome (Brands)' ),
		scriptId: 'themezee-advanced-icon-block-fa-brands',
		scriptUrl: 'fa-brands.js',
	},
	{
		name: 'fa-regular',
		title: __( 'Font Awesome (Regular)' ),
		scriptId: 'themezee-advanced-icon-block-fa-regular',
		scriptUrl: 'fa-regular.js',
	},
	{
		name: 'fa-solid',
		title: __( 'Font Awesome (Solid)' ),
		scriptId: 'themezee-advanced-icon-block-fa-solid',
		scriptUrl: 'fa-solid.js',
	},
	{
		name: 'material-filled',
		title: __( 'Material Icons (Filled)' ),
		scriptId: 'themezee-advanced-icon-block-material-filled',
		scriptUrl: 'material-filled.js',
	},
	{
		name: 'material-outlined',
		title: __( 'Material Icons (Outlined)' ),
		scriptId: 'themezee-advanced-icon-block-material-outlined',
		scriptUrl: 'material-outlined.js',
	},
	{
		name: 'wordpress',
		title: __( 'WordPress' ),
	},
];
