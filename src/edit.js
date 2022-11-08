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
	ExternalLink,
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
import { dispatch } from '@wordpress/data';
import { useCallback, useEffect, useState, useRef } from '@wordpress/element';
import { displayShortcut, isKeyboardEvent } from '@wordpress/keycodes';
import {
	Icon,
	rotateRight,
	flipHorizontal as flipH,
	flipVertical as flipV,
	link,
	linkOff,
	search,
} from '@wordpress/icons';
import { SVG, Path } from '@wordpress/components';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import IconModal from './components/icon-modal';
import SearchPopover from './components/search-popover';
import UnitRangeControl from './components/unit-range-control';
import './editor.scss';

const placeholderIcon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
		<Path d="m33.4 31 8.6-7.4 4.25.35-9.45 8.1 2.85 12.3-3.7-2.25Zm-4.65-14.45-2.85-6.7L27.5 6l4.6 10.85Zm-15.6 21.2 7.85-4.7 7.85 4.75-2.1-8.9 6.9-6-9.1-.8L21 13.7l-3.55 8.35-9.1.8 6.9 6ZM8.65 44l3.25-14.05L1 20.5l14.4-1.25L21 6l5.6 13.25L41 20.5l-10.9 9.45L33.35 44 21 36.55ZM21 26.75Z"/>
	</SVG>
);

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
		title,
	} = attributes;

	// Store default preferences.
	dispatch( preferencesStore ).setDefaults(
		'themezee/icon-block',
		{
			enabledLibraries: [ '__all', 'wordpress', 'fa-regular' ],
			showIconNames: true,
			iconSize: 32,
		}
	);

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
		<figure className={ iconClasses } style={ iconStyles } aria-label={ label ? label : undefined } title={ title ? title : undefined }>
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
									title={ __( 'Link', 'themezee-icon-block' ) }
									shortcut={ displayShortcut.primary( 'k' ) }
									onClick={ startEditing }
								/>
							) }
							{ isURLSet && (
								<ToolbarButton
									name="link"
									icon={ linkOff }
									title={ __( 'Unlink', 'themezee-icon-block' ) }
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
							anchor={ ref?.current }
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
								label={ __( 'Rotate', 'themezee-icon-block' ) }
								onClick={ () =>
									setAttributes( {
										rotate: rotate === 270 ? 0 : rotate + 90,
									} )
								}
								isPressed={ rotate !== 0 }
							/>
							<ToolbarButton
								icon={ flipH }
								label={ __( 'Flip Horizontal', 'themezee-icon-block' ) }
								onClick={ () =>
									setAttributes( {
										flipHorizontal: ! flipHorizontal,
									} )
								}
								isPressed={ flipHorizontal }
							/>
							<ToolbarButton
								icon={ flipV }
								label={ __( 'Flip Vertical', 'themezee-icon-block' ) }
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
								onClick={ () => setIconModalOpen( true ) }>
									{ __( 'Replace', 'themezee-icon-block' ) }
							</ToolbarButton>
							<ToolbarButton
								icon={ search }
								label={ __( 'Search icon', 'themezee-icon-block' ) }
								onClick={ () => setSearchPopoverOpen( true ) }
							/>
						</ToolbarGroup>
					</BlockControls>

					<InspectorControls>
						<ToolsPanel label={ __( 'Icon settings', 'themezee-icon-block' ) }>
							<ToolsPanelItem
								hasValue={ () => iconWidth === "48px" ? false : true }
								label={ __( 'Icon size', 'themezee-icon-block' ) }
								onDeselect={ () => setAttributes( { iconWidth: "48px", iconHeight: "48px" } ) }
								resetAllFilter={ () => ( { iconWidth: "48px", iconHeight: "48px" } ) }
								isShownByDefault={ true }
							>
								<UnitRangeControl
									label={ __( 'Icon size', 'themezee-icon-block' ) }
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
								label={ __( 'Icon label', 'themezee-icon-block' ) }
								onDeselect={ () => setAttributes( { label: undefined } ) }
								resetAllFilter={ () => ( { label: undefined } ) }
								isShownByDefault={ true }
							>
								<TextControl
									label={ __( 'Icon label', 'themezee-icon-block' ) }
									help={ __( 'Briefly describe the icon to help screen reader users.', 'themezee-icon-block' ) }
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
								label={ __( 'Block width', 'themezee-icon-block' ) }
								isResetValueOnUnitChange
								value={ blockWidth }
								onChange={ ( value ) => setAttributes( { blockWidth: value } ) }
							/>
							<ButtonGroup aria-label={ __( 'Button width', 'themezee-icon-block' ) }>
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
							label={ __( 'Link rel', 'themezee-icon-block' ) }
							value={ rel || '' }
							onChange={ onSetLinkRel }
						/>

						<TextControl
							label={ __( 'Title attribute', 'themezee-icon-block' ) }
							value={ title || '' }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							help={
								<>
									{ __( 'Describe the role of this icon on the page.', 'themezee-icon-block' ) }
									<ExternalLink href="https://www.w3.org/TR/html52/dom.html#the-title-attribute">
										{ __( '(Note: many devices and browsers do not display this text.)', 'themezee-icon-block' ) }
									</ExternalLink>
								</>
							}
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
						label={ __( 'Icon', 'themezee-icon-block' ) }
						instructions={ __( 'Browse all icons in the library or run a quick search.', 'themezee-icon-block' ) }
						className="wp-block-themezee-icon-placeholder has-illustration"
					>
						<Icon
							className="components-placeholder__illustration"
							icon={ placeholderIcon }
						/>
						<Button
							isPrimary
							onClick={ () => setIconModalOpen( true ) }
						>
							{ __( 'Icon Library', 'themezee-icon-block' ) }
						</Button>
						<Button
							isTertiary
							onClick={ () => setSearchPopoverOpen( true ) }
						>
							{ __( 'Quick Search', 'themezee-icon-block' ) }
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
				anchor={ ref?.current }
			/>
		</>
	);
}

export default Edit;
