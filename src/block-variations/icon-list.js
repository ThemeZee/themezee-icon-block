/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { list as icon } from '@wordpress/icons';
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation(
	'core/group', {
		name: 'themezee/icon-list',
		title: __( 'Icon List' ),
		icon,
		description: __( 'Create a list with icons.' ),
		category: 'text',
		attributes: {
			layout: { type: 'flex', orientation: 'vertical' },
			style: { spacing: { blockGap: '0px' } },
		},
		scope: [ 'inserter' ],
		isActive: ( blockAttributes ) =>
			blockAttributes.layout?.type === 'flex' &&
			( ! blockAttributes.layout?.orientation ||
				blockAttributes.layout?.orientation === 'horizontal' ),
		innerBlocks: [
			[
				'core/group', 
				{
					layout: { type: 'flex', flexWrap: 'nowrap' },
					style: { spacing: { blockGap: '8px' } },
				},
				[
					[ 'themezee/advanced-icon', {
						iconName: "bell",
						iconLibrary: "fa-regular",
						iconWidth: "1em",
						iconHeight: "1em",
					}],
					[ 'core/paragraph', {
						placeholder: __( 'List' ),
					} ],
				],
			],
			[
				'core/group', 
				{
					layout: { type: 'flex', flexWrap: 'nowrap' },
					style: { spacing: { blockGap: '8px' } },
				},
				[
					[ 'themezee/advanced-icon', {
						iconName: "star",
						iconLibrary: "fa-regular",
						iconWidth: "1em",
						iconHeight: "1em",
					}],
					[ 'core/paragraph', {
						placeholder: __( 'List' ),
					} ],
				],
			],
			[
				'core/group', 
				{
					layout: { type: 'flex', flexWrap: 'nowrap' },
					style: { spacing: { blockGap: '8px' } },
				},
				[
					[ 'themezee/advanced-icon', {
						iconName: "heart",
						iconLibrary: "fa-regular",
						iconWidth: "1em",
						iconHeight: "1em",
					}],
					[ 'core/paragraph', {
						placeholder: __( 'List' ),
					} ],
				],
			],
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
					name: 'core/group',
					attributes: {
						layout: { type: 'flex', flexWrap: 'nowrap' },
						style: { spacing: { blockGap: '8px' } },
					},
					innerBlocks: [
						{
							name: 'themezee/advanced-icon',
							attributes: {
								iconName: "bell",
								iconLibrary: "fa-regular",
								iconWidth: "1em",
								iconHeight: "1em",
							},
						},
						{
							name: 'core/paragraph',
							attributes: {
								placeholder: __( 'List' ),
							},
						},
					],
				},
				{
					name: 'core/group',
					attributes: {
						layout: { type: 'flex', flexWrap: 'nowrap' },
						style: { spacing: { blockGap: '8px' } },
					},
					innerBlocks: [
						{
							name: 'themezee/advanced-icon',
							attributes: {
								iconName: "star",
								iconLibrary: "fa-regular",
								iconWidth: "1em",
								iconHeight: "1em",
							},
						},
						{
							name: 'core/paragraph',
							attributes: {
								placeholder: __( 'List' ),
							},
						},
					],
				},
				{
					name: 'core/group',
					attributes: {
						layout: { type: 'flex', flexWrap: 'nowrap' },
						style: { spacing: { blockGap: '8px' } },
					},
					innerBlocks: [
						{
							name: 'themezee/advanced-icon',
							attributes: {
								iconName: "heart",
								iconLibrary: "fa-regular",
								iconWidth: "1em",
								iconHeight: "1em",
							},
						},
						{
							name: 'core/paragraph',
							attributes: {
								placeholder: __( 'List' ),
							},
						},
					],
				},
			],
		},
	}
);
