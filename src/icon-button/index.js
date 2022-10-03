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
		<Path d="M7 34q-1.25 0-2.125-.875T4 31V17q0-1.25.875-2.125T7 14h34q1.25 0 2.125.875T44 17v14q0 1.25-.875 2.125T41 34h-3.2v-3H41V17H7v14h13.2v3Zm22 4-1.8-4-4-1.8 4-1.8 1.8-4 1.8 4 4 1.8-4 1.8Zm5-10.6-1.05-2.35L30.6 24l2.35-1.05L34 20.6l1.05 2.35L37.4 24l-2.35 1.05Z"/>
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
	merge: ( a, { text = '' } ) => ( {
		...a,
		text: ( a.text || '' ) + text,
	} ),
} );
