/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	useBlockProps,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	ToolbarGroup,
	__experimentalUnitControl as UnitControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { pencil as defaultIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import getIcons from './icons';
import InserterModal from './inserter';
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
	setAttributes,
} ) {
	const {
		iconName,
		iconLibrary,
		iconWidth,
		iconHeight,
		textAlign,
	} = attributes;

	const [ isInserterOpen, setInserterOpen ] = useState( false );

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	const borderProps = useBorderProps( attributes );
	const colorProps = useColorProps( attributes );
	const spacingProps = useSpacingProps( attributes );

	const containerClasses = classnames(
		'icon-container',
		colorProps.className,
		borderProps.className,
	);

	const containerStyles = {
		...borderProps.style,
		...colorProps.style,
		...spacingProps.style,
	};

	const iconClasses = classnames( 'icon', {
		[ `icon-name-${ iconName }` ]: iconName,
		[ `icon-library-${ iconLibrary }` ]: iconLibrary,
	} );

	const iconStyles = {
		width: iconWidth,
		height: iconHeight,
	};

	const iconsObject = getIcons();
	const icons = iconsObject.icons;
	const selectedIcon = icons.filter( ( i ) => ( i.name === iconName && i.library === iconLibrary ) );
	const iconSVG = ! isEmpty( selectedIcon ) ? selectedIcon[ 0 ].icon : defaultIcon;

	const iconMarkup = (
		<figure className={ iconClasses } style={ iconStyles }>
			{ iconSVG }
		</figure>
	);

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
				<ToolbarGroup>
					<ToolbarButton
						onClick={ () => setInserterOpen(true) }>
							{ __( 'Change icon' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<ToolsPanel label={ __( 'Icon Settings' ) }>
					<ToolsPanelItem
						hasValue={ () => {
							return iconWidth === "36px" ? false : true;
						} }
						label={ __( 'Icon Size' ) }
						onDeselect={ () => setAttributes( { iconWidth: "36px", iconHeight: "36px" } ) }
						resetAllFilter={ () => ( { iconWidth: "36px", iconHeight: "36px" } ) }
						isShownByDefault={ true }
					>
						<UnitControl
							label={ __( 'Icon Size' ) }
							isResetValueOnUnitChange
							value={ iconWidth }
							onChange={ ( value ) => setAttributes( { iconWidth: value, iconHeight: value } ) }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ containerClasses } style={ containerStyles }>
					{ iconMarkup }
				</div>
			</div>

			<InserterModal
				isInserterOpen={ isInserterOpen }
				setInserterOpen={ setInserterOpen }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</>
	);
}

export default Edit;
