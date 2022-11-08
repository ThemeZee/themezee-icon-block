/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const libraries = [
	{
		name: '__all',
		title: __( 'All Icons', 'themezee-icon-block' ),
	},
	{
		name: 'fa-brands',
		title: __( 'Font Awesome (Brands)', 'themezee-icon-block' ),
		scriptId: 'themezee-icon-block-fa-brands',
		scriptUrl: 'fa-brands.js',
	},
	{
		name: 'fa-regular',
		title: __( 'Font Awesome (Regular)', 'themezee-icon-block' ),
		scriptId: 'themezee-icon-block-fa-regular',
		scriptUrl: 'fa-regular.js',
	},
	{
		name: 'fa-solid',
		title: __( 'Font Awesome (Solid)', 'themezee-icon-block' ),
		scriptId: 'themezee-icon-block-fa-solid',
		scriptUrl: 'fa-solid.js',
	},
	{
		name: 'material-filled',
		title: __( 'Material Icons (Filled)', 'themezee-icon-block' ),
		scriptId: 'themezee-icon-block-material-filled',
		scriptUrl: 'material-filled.js',
	},
	{
		name: 'material-outlined',
		title: __( 'Material Icons (Outlined)', 'themezee-icon-block' ),
		scriptId: 'themezee-icon-block-material-outlined',
		scriptUrl: 'material-outlined.js',
	},
	{
		name: 'wordpress',
		title: __( 'WordPress', 'themezee-icon-block' ),
	},
];
