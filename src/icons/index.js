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
export default function getIcons() {
	return applyFilters( 'iconBlock.icons', icons );
}
