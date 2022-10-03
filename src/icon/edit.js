/**
 * External dependencies
 */
import classnames from 'classnames';
import parse from 'html-react-parser';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	JustifyContentControl,
	useBlockProps,
	useSetting,
	__experimentalLinkControl as LinkControl,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
} from '@wordpress/block-editor';
import {
	Button,
	ButtonGroup,
	Popover,
	Placeholder,
	TextControl,
	ToolbarButton,
	ToolbarGroup,
	__experimentalUnitControl as UnitControl,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { useCallback, useEffect, useState, useRef } from '@wordpress/element';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import {
	siteLogo as placeholderIcon,
	rotateRight,
	flipHorizontal as flipH,
	flipVertical as flipV,
	link,
	linkOff,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import IconModal from './components/icon-modal';
import SearchPopover from './components/search-popover';
import UnitRangeControl from './components/unit-range-control';
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
	const {
		blockWidth,
		iconName,
		iconLibrary,
		iconSVG,
		iconWidth,
		iconHeight,
		justification,
		rotate,
		flipHorizontal,
		flipVertical,
		url,
		linkTarget,
		rel,
		label,
	} = attributes;

	const [ isIconModalOpen, setIconModalOpen ] = useState( false );
	const [ isSearchPopoverOpen, setSearchPopoverOpen ] = useState( false );

	const availableUnitSettings = (
		useSetting( 'spacing.units' ) || undefined
	)?.filter( ( availableUnit ) => availableUnit !== '%' );

	const units = useCustomUnits( {
		availableUnits: availableUnitSettings || [
			'px',
			'em',
			'rem',
			'vw',
			'vh',
		],
		defaultValues: { px: 48, em: 3, rem: 3, vw: 3, vh: 6 },
	} );

	const onSetLinkRel = useCallback(
		( value ) => {
			setAttributes( { rel: value } );
		},
		[ setAttributes ]
	);

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = linkTarget === '_blank';

	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );

	function onToggleOpenInNewTab( value ) {
		const newLinkTarget = value ? '_blank' : undefined;

		let updatedRel = rel;
		if ( newLinkTarget && ! rel ) {
			updatedRel = 'noreferrer noopener';
		} else if ( ! newLinkTarget && rel === 'noreferrer noopener' ) {
			updatedRel = undefined;
		}

		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel,
		} );
	}

	function onKeyDown( event ) {
		if ( isKeyboardEvent.primary( event, 'k' ) ) {
			startEditing( event );
		} else if ( isKeyboardEvent.primaryShift( event, 'k' ) ) {
			unlink();
			ref.current?.focus();
		}
	}

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}

	function unlink() {
		setAttributes( {
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsEditingURL( false );
	}

	const borderProps = useBorderProps( attributes );
	const colorProps = useColorProps( attributes );
	const spacingProps = useSpacingProps( attributes );
	const ref = useRef();

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `items-justified-${ justification }` ]: justification,
			[ `rotate-${ rotate }` ]: rotate,
			'flip-horizontal': flipHorizontal,
			'flip-vertical': flipVertical,
		} ),
		ref,
		onKeyDown,
	} );

	const containerClasses = classnames(
		'icon-container',
		colorProps.className,
		borderProps.className,
	);

	const containerStyles = {
		...borderProps.style,
		...colorProps.style,
		...spacingProps.style,
		width: blockWidth ? blockWidth : undefined,
	};

	const iconClasses = classnames( 'icon', {
		[ `icon-name-${ iconName }` ]: iconName,
		[ `icon-library-${ iconLibrary }` ]: iconLibrary,
	} );

	const iconStyles = {
		width: iconWidth,
		height: iconHeight,
	};

	// If icon is retrieved from post body as string, then parse and convert it to React element.
	const iconElement = typeof iconSVG === 'string' ? parse( iconSVG, { trim: true } ) : iconSVG;

	const figure = (
		<figure className={ iconClasses } style={ iconStyles } aria-label={ label ? label : undefined }>
			{ iconElement }
		</figure>
	);

	const iconMarkup = (
		<div className={ containerClasses } style={ containerStyles }>
			{ figure }
		</div>
	);

	return (
		<>
			{ iconName && (
				<>
					<BlockControls group="block">
						<ToolbarGroup>
							<JustifyContentControl
								allowedControls={ [ 'left', 'center', 'right' ] }
								value={ justification }
								onChange={ ( value ) => setAttributes( { justification: value } ) }
							/>
						</ToolbarGroup>
					</BlockControls>

					<BlockControls>
						<ToolbarGroup>
							{ ! isURLSet && (
								<ToolbarButton
									name="link"
									icon={ link }
									title={ __( 'Link' ) }
									shortcut={ displayShortcut.primary( 'k' ) }
									onClick={ startEditing }
								/>
							) }
							{ isURLSet && (
								<ToolbarButton
									name="link"
									icon={ linkOff }
									title={ __( 'Unlink' ) }
									shortcut={ displayShortcut.primaryShift( 'k' ) }
									onClick={ unlink }
									isActive={ true }
								/>
							) }
						</ToolbarGroup>
					</BlockControls>

					{ isSelected && ( isEditingURL || isURLSet ) && (
						<Popover
							position="bottom center"
							onClose={ () => {
								setIsEditingURL( false );
								ref.current?.focus();
							} }
							anchorRef={ ref?.current }
							focusOnMount={ isEditingURL ? 'firstElement' : false }
							__unstableSlotName={ '__unstable-block-tools-after' }
						>
							<LinkControl
								className="wp-block-navigation-link__inline-link-input"
								value={ { url, opensInNewTab } }
								onChange={ ( {
									url: newURL = '',
									opensInNewTab: newOpensInNewTab,
								} ) => {
									setAttributes( { url: newURL } );

									if ( opensInNewTab !== newOpensInNewTab ) {
										onToggleOpenInNewTab( newOpensInNewTab );
									}
								} }
								onRemove={ () => {
									unlink();
									ref.current?.focus();
								} }
								forceIsEditingLink={ isEditingURL }
							/>
						</Popover>
					) }

					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								className={ `themezee-icon-block__rotate-button-${ rotate }` }
								icon={ rotateRight }
								label={ __( 'Rotate' ) }
								onClick={ () =>
									setAttributes( {
										rotate: rotate === 270 ? 0 : rotate + 90,
									} )
								}
								isPressed={ rotate !== 0 }
							/>
							<ToolbarButton
								icon={ flipH }
								label={ __( 'Flip Horizontal' ) }
								onClick={ () =>
									setAttributes( {
										flipHorizontal: ! flipHorizontal,
									} )
								}
								isPressed={ flipHorizontal }
							/>
							<ToolbarButton
								icon={ flipV }
								label={ __( 'Flip Vertical' ) }
								onClick={ () =>
									setAttributes( {
										flipVertical: ! flipVertical,
									} )
								}
								isPressed={ flipVertical }
							/>
						</ToolbarGroup>
						<ToolbarGroup>
							<ToolbarButton
								onClick={ () => setIconModalOpen(true) }>
									{ __( 'Replace' ) }
							</ToolbarButton>
						</ToolbarGroup>
					</BlockControls>

					<InspectorControls>
						<ToolsPanel label={ __( 'Icon settings' ) }>
							<ToolsPanelItem
								hasValue={ () => iconWidth === "48px" ? false : true }
								label={ __( 'Icon size' ) }
								onDeselect={ () => setAttributes( { iconWidth: "48px", iconHeight: "48px" } ) }
								resetAllFilter={ () => ( { iconWidth: "48px", iconHeight: "48px" } ) }
								isShownByDefault={ true }
							>
								<UnitRangeControl
									label={ __( 'Icon size' ) }
									value={ iconWidth }
									onChange={ ( value ) => setAttributes( { iconWidth: value, iconHeight: value } ) }
									units = {units}
									max = { {
										'px': 320,
										'em': 20,
										'rem': 20,
										'vw': 20,
										'vh': 20,
									} }
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () => label ? true : false }
								label={ __( 'Icon label' ) }
								onDeselect={ () => setAttributes( { label: undefined } ) }
								resetAllFilter={ () => ( { label: undefined } ) }
								isShownByDefault={ false }
							>
								<TextControl
									label={ __( 'Icon label' ) }
									help={ __(
										'Briefly describe the icon to help screen reader users.'
									) }
									value={ label }
									onChange={ ( value ) =>
										setAttributes( { label: value } )
									}
								/>
							</ToolsPanelItem>
						</ToolsPanel>
					</InspectorControls>

					<InspectorControls __experimentalGroup="dimensions">
						<div className="components-block-width-control__wrapper">
							<UnitControl
								label={ __( 'Block width' ) }
								isResetValueOnUnitChange
								value={ blockWidth }
								onChange={ ( value ) => setAttributes( { blockWidth: value } ) }
							/>
							<ButtonGroup aria-label={ __( 'Button width' ) }>
								{ [ "25%", "50%", "75%", "100%" ].map( ( widthValue ) => {
									return (
										<Button
											key={ widthValue }
											isSmall
											variant={
												widthValue === blockWidth
													? 'primary'
													: undefined
											}
											onClick={ () => ( function ( newWidth ) {
												const width = blockWidth === newWidth ? undefined : newWidth;
												setAttributes( { blockWidth: width } );
											} )( widthValue ) }
										>
											{ widthValue }
										</Button>
									);
								} ) }
							</ButtonGroup>
						</div>
					</InspectorControls>

					<InspectorControls __experimentalGroup="advanced">
						<TextControl
							label={ __( 'Link rel' ) }
							value={ rel || '' }
							onChange={ onSetLinkRel }
						/>
					</InspectorControls>
				</> 
			) }

			{ iconName && (
				<div { ...blockProps }>
					{ iconMarkup }
				</div>
			) }

			{ ! iconName && (
				<div { ...blockProps }>
					<Placeholder
						icon={ placeholderIcon }
						label={ __( 'Advanced Icon' ) }
						className="wp-block-themezee-icon-placeholder"
					>
							<Button
								isPrimary
								onClick={ () => setIconModalOpen( true ) }
							>
								{ __( 'Browse all icons', 'icon-block' ) }
							</Button>
							<Button
								isSecondary
								onClick={ () => setSearchPopoverOpen( true ) }
							>
								{ __( 'Search for icon', 'icon-block' ) }
							</Button>
					</Placeholder>
				</div>
			) }

			<IconModal
				isIconModalOpen={ isIconModalOpen }
				setIconModalOpen={ setIconModalOpen }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<SearchPopover
				setIconModalOpen={ setIconModalOpen }
				isSearchPopoverOpen={ isSearchPopoverOpen }
				setSearchPopoverOpen={ setSearchPopoverOpen }
				setAttributes={ setAttributes }
				anchorRef={ ref?.current }
			/>
		</>
	);
}

export default Edit;