/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { className } ) {
	const blockProps = useBlockProps.save( { className } );
	return (
		<ul { ...blockProps }>
			<InnerBlocks.Content />
		</ul>
	);
}
