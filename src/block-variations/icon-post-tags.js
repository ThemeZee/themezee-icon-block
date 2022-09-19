/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { postTerms as icon } from '@wordpress/icons';
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation(
	'core/group', {
	name: 'themezee/icon-post-tags',
	title: __( 'Icon Post Tags' ),
	icon,
	description: __( 'Arrange icon and post tags horizontally.' ),
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
			iconName: "tag",
			iconLibrary: "wordpress",
			iconWidth: "1em",
			iconHeight: "1em",
		}],
		[ 'core/post-terms', {
			term: 'post_tag',
		} ],
	],
	}
);
