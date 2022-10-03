/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { SVG, Path } from '@wordpress/components';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';
import './style.scss';

const icon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
		<Path d="M20.95 31.95 35.4 17.5l-2.15-2.15-12.3 12.3L15 21.7l-2.15 2.15ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"/>
	</SVG>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	icon,
	edit,
	save,
	merge( attributes, attributesToMerge ) {
		return {
			...attributes,
			content: attributes.content + attributesToMerge.content,
		};
	},
} );
