/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit( {
	className,
 } ) {
	const blockProps = useBlockProps( { className } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'themezee/icon-list-item' ],
		template: [ [ 'themezee/icon-list-item' ] ],
		templateLock: false,
		templateInsertUpdatesSelection: true,
	} );

	return <ul { ...innerBlocksProps } />;
}
