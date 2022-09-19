/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { postCategories as icon } from '@wordpress/icons';
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation(
	'core/group', {
		name: 'themezee/icon-post-categories',
		title: __( 'Icon Post Categories' ),
		icon,
		description: __( 'Arrange icon and post categories horizontally.' ),
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
				iconName: "archive",
				iconLibrary: "wordpress",
				iconWidth: "1.2em",
				iconHeight: "1.2em",
			}],
			[ 'core/post-terms', {
				term: 'category',
			} ],
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
						iconName: "archive",
						iconLibrary: "wordpress",
						iconWidth: "1.2em",
						iconHeight: "1.2em",
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: __( 'Post Categories' ),
					},
				},
			],
		},
	}
);
