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
	ContrastChecker,
	InspectorControls,
	useBlockProps,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	withColors,
} from '@wordpress/block-editor';
import {
	ToolbarButton,
	ToolbarGroup,
	__experimentalUnitControl as UnitControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
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
	clientId,
	iconColor,
	iconBackgroundColor,
	setAttributes,
	setIconColor,
	setIconBackgroundColor,
} ) {
	const {
		iconName,
		iconLibrary,
		iconWidth,
		iconHeight,
		iconColorValue,
		iconBackgroundColorValue,
		textAlign,
	} = attributes;

	const [ isInserterOpen, setInserterOpen ] = useState( false );

	const iconsObject = getIcons();
	const icons = iconsObject.icons;
	const selectedIcon = icons.filter( ( i ) => ( i.name === iconName && i.library === iconLibrary ) );
	const iconSVG = ! isEmpty( selectedIcon ) ? selectedIcon[ 0 ].icon : defaultIcon;

	const colorSettings = [
		{
			// Use custom attribute as fallback to prevent loss of named color selection when
			// switching themes to a new theme that does not have a matching named color.
			value: iconColor.color || iconColorValue,
			onChange: ( colorValue ) => {
				setIconColor( colorValue );
				setAttributes( { iconColorValue: colorValue } );
			},
			label: __( 'Icon color' ),
			key: 'icon-color',
			resetAllFilter: () => {
				setIconColor( undefined );
				setAttributes( { iconColorValue: undefined } );
			},
		},
		{
			// Use custom attribute as fallback to prevent loss of named color selection when
			// switching themes to a new theme that does not have a matching named color.
			value: iconBackgroundColor.color || iconBackgroundColorValue,
			onChange: ( colorValue ) => {
				setIconBackgroundColor( colorValue );
				setAttributes( {
					iconBackgroundColorValue: colorValue,
				} );
			},
			label: __( 'Icon background' ),
			key: 'icon-background-color',
			resetAllFilter: () => {
				setIconBackgroundColor( undefined );
				setAttributes( { iconBackgroundColorValue: undefined } );
			},
		} 
	];

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	const iconClasses = classnames( 'icon-wrap', {
	[ `icon-name-${ iconName }` ]: iconName,
	[ `icon-library-${ iconLibrary }` ]: iconLibrary,
} );

	const iconStyles = {
		width: iconWidth,
		height: iconHeight,
	};

	const iconMarkup = (
		<span className={ iconClasses } style={ iconStyles }>
			{ iconSVG }
		</span>
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

			<InspectorControls __experimentalGroup="color">
				{ colorSettings.map(
					( { onChange, label, key, value, resetAllFilter } ) => (
						<ColorGradientSettingsDropdown
							key={ `${ key }-control` }
							__experimentalHasMultipleOrigins
							__experimentalIsRenderedInSidebar
							settings={ [
								{
									colorValue: value,
									label,
									onColorChange: onChange,
									isShownByDefault: true,
									resetAllFilter,
									enableAlpha: true,
								},
							] }
							panelId={ clientId }
							{ ...colorGradientSettings }
						/>
					)
				) }
				<ContrastChecker
					{ ...{
						textColor: iconColorValue,
						backgroundColor: iconBackgroundColorValue,
					} }
					isLargeText={ false }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				{ iconMarkup }
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

export default compose( [
	withColors( 'iconColor', 'iconBackgroundColor' ),
] )( Edit );
