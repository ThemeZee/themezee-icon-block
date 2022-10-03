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
		allowedBlocks: [ 'themezee/icon' ],
		template: [ [ 'themezee/icon', {
			iconName: "check",
			iconLibrary: "wordpress",
			iconSVG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.7 7.1l-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"></path></svg>',
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
