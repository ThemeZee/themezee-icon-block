/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { heading as icon } from '@wordpress/icons';
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation(
	'core/group', {
	name: 'icon-heading',
	title: __( 'Icon Heading' ),
	icon,
	description: __( 'Arrange blocks horizontally.' ),
	attributes: {
		layout: { type: 'flex', flexWrap: 'nowrap' },
		style: { spacing: { blockGap: '12px' } },
	},
	scope: [ 'inserter' ],
	isActive: ( blockAttributes ) =>
		blockAttributes.layout?.type === 'flex' &&
		( ! blockAttributes.layout?.orientation ||
			blockAttributes.layout?.orientation === 'horizontal' ),
	innerBlocks: [
		[ 'themezee/advanced-icon', {
			iconName: "cover",
			iconLibrary: "wordpress",
			iconWidth: "36px",
			iconHeight: "36px",
		}],
		[ 'core/heading', {
			placeholder: __( 'Icon Heading' ),
		} ],
	],
	}
);
