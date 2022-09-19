/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	Button,
	ButtonGroup,
	Popover,
	Placeholder,
	TextControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit( {
	attributes,
	isSelected,
	setAttributes,
} ) {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		orientation: "horizontal",
		template: [
			[
				'themezee/advanced-icon',
				{
					iconName: "siteLogo",
					iconLibrary: "wordpress",
					iconWidth: "24px",
					iconHeight: "24px",
				},
			],
			[
				'core/paragraph', {}
			],
		],
		templateLock: "contentOnly",
	} );

	return (
		<div { ...innerBlocksProps } />
	);
}

export default Edit;