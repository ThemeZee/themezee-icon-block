/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	return (
		<li { ...useBlockProps.save() }>
			<InnerBlocks.Content />
			<RichText.Content value={ attributes.content } />
		</li>
	);
}
