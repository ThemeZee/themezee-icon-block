/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [ [ 'themezee/icon-list-item' ] ];

export default function Edit( { attributes, setAttributes, clientId, style } ) {
	const blockProps = useBlockProps( {} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'themezee/icon-list-item' ],
		template: TEMPLATE,
		templateLock: false,
		templateInsertUpdatesSelection: true,
	} );

	return <ul { ...innerBlocksProps } />;
}
