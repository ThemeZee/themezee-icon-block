/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { postAuthor as icon } from '@wordpress/icons';
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation(
	'core/group', {
		name: 'themezee/icon-post-author-name',
		title: __( 'Icon Post Author Name' ),
		icon,
		description: __( 'Arrange icon and post author horizontally.' ),
		category: 'theme',
		attributes: {
			layout: { type: 'flex', flexWrap: 'nowrap' },
			style: { spacing: { blockGap: '5px' } },
		},
		scope: [ 'inserter' ],
		isActive: ( blockAttributes ) =>
			blockAttributes.layout?.type === 'flex' &&
			( ! blockAttributes.layout?.orientation ||
				blockAttributes.layout?.orientation === 'horizontal' ),
		innerBlocks: [
			[ 'themezee/advanced-icon', {
				iconName: "commentAuthorAvatar",
				iconLibrary: "wordpress",
				iconWidth: "1.4em",
				iconHeight: "1.4em",
			}],
			[ 'core/post-author-name', {} ],
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
						iconName: "commentAuthorAvatar",
						iconLibrary: "wordpress",
						iconWidth: "1.4em",
						iconHeight: "1.4em",
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: __( 'Post Author' ),
					},
				},
			],
		},
	}
);
