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
		category: 'theme',
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
				iconWidth: "1.1em",
				iconHeight: "1.1em",
			}],
			[ 'core/post-date', {} ],
		],
		example: {
			attributes: {
				style: {
					color: {
						text: '#000000',
						background: '#ffffff',
					},
				},
			},
			innerBlocks: [
				{
					name: 'themezee/advanced-icon',
					attributes: {
						iconName: "calendar",
						iconLibrary: "wordpress",
						iconWidth: "1.1em",
						iconHeight: "1.1em",
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: __( 'Post Date' ),
					},
				},
			],
		},
	}
);
