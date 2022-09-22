/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export default function ListItemEdit( {
	attributes,
	setAttributes,
	onReplace,
	mergeBlocks,
	clientId,
} ) {
	const { placeholder, content } = attributes;

	const ref = useRef();
	const richTextRef = useRef();
	const blockProps = useBlockProps( { ref } );

	const { getBlock } = useSelect( blockEditorStore );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'themezee/advanced-icon' ],
		template: [ [ 'themezee/advanced-icon', {
			iconName: "check",
			iconLibrary: "wordpress",
			iconWidth: "1.2em",
			iconHeight: "1.2em",
		} ] ],
		renderAppender: false,
	} );

	return (
		<>
			<li { ...innerBlocksProps }>
				{ innerBlocksProps.children }
				<RichText
					ref={ richTextRef }
					identifier="content"
					tagName="div"
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
					value={ content }
					aria-label={ __( 'List text' ) }
					placeholder={ placeholder || __( 'List' ) }
					onSplit={ ( value ) => {
						const innerBlocks = getBlock( clientId ).innerBlocks;
						return createBlock(
							'themezee/icon-list-item',
							{
								...attributes,
								content: value,
							},
							innerBlocks.length > 0 ? [ createBlock( innerBlocks[0].name, innerBlocks[0].attributes ) ] : []
						);
					} }
					onReplace={ onReplace }
					onMerge={ mergeBlocks }
				/>
			</li>
		</>
	);
}
