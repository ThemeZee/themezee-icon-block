/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { buttons as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	icon,
	example: {
		innerBlocks: [
			{
				name: 'themezee/icon-button',
				attributes: { text: __( 'Find out more' ) },
				innerBlocks: [ { 
					name: 'themezee/advanced-icon', 
					attributes: {
						iconName: "info",
						iconLibrary: "wordpress",
						iconWidth: "1.2em",
						iconHeight: "1.2em",
					}
				} ]
			},
			{
				name: 'themezee/icon-button',
				attributes: { text: __( 'Contact us' ) },
				innerBlocks: [ { 
					name: 'themezee/advanced-icon', 
					attributes: {
						iconName: "atSymbol",
						iconLibrary: "wordpress",
						iconWidth: "1.2em",
						iconHeight: "1.2em",
					}
				} ]
			},
		],
	},
	edit,
	save,
} );
