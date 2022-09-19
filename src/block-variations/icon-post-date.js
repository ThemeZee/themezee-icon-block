/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { postDate as icon } from '@wordpress/icons';
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation(
	'core/group', {
	name: 'themezee/icon-post-date',
	title: __( 'Icon Post Date' ),
	icon,
	description: __( 'Arrange icon and post date horizontally.' ),
	attributes: {
		layout: { type: 'flex', flexWrap: 'nowrap' },
		style: { spacing: { blockGap: '8px' } },
	},
	scope: [ 'inserter' ],
	isActive: ( blockAttributes ) =>
		blockAttributes.layout?.type === 'flex' &&
		( ! blockAttributes.layout?.orientation ||
			blockAttributes.layout?.orientation === 'horizontal' ),
	innerBlocks: [
		[ 'themezee/advanced-icon', {
			iconName: "calendar",
			iconLibrary: "wordpress",
			iconWidth: "1em",
			iconHeight: "1em",
		}],
		[ 'core/post-date', {} ],
	],
	}
);
