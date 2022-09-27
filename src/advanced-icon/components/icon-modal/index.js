/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	ButtonGroup,
	MenuGroup,
	MenuItem,
	Modal,
	SearchControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { store as preferencesStore } from '@wordpress/preferences';

/**
 * Internal dependencies
 */
import { getIcons } from './../../icons';
import './style.scss';

export default function IconModal( props ) {
	const {
		isIconModalOpen,
		setIconModalOpen,
		attributes,
		setAttributes,
	} = props;

	if ( ! isIconModalOpen ) {
		return null;
	}

	const iconsObject = getIcons();
	const icons = iconsObject.icons;
	const libraries = iconsObject.libraries;

	// Store default preferences.
	dispatch( preferencesStore ).setDefaults(
		'themezee/advanced-icon-block',
		{
			showIconNames: true,
			iconSize: 32,
		}
	);

	// State Hooks.
	const [ filteredIcons, setFilteredIcons ] = useState( icons );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ currentLibrary, setCurrentLibrary ] = useState( attributes.iconLibrary );
	const [ iconSize, setIconSize ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'iconSize' ) );
	const [ showIconNames, setShowIconNames ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'showIconNames' ) );

	function updateIconName( name, library, svg ) {
		setAttributes( {
			iconName: name,
			iconLibrary: library,
			iconSVG: svg,
		} );
		setIconModalOpen( false );
	}

	function filterIcons( search ) {
		let newIcons;

		// Filter icons if search is active.
		if ( search ) {
			newIcons = icons.filter( ( icon ) => {
				const input = search.toLowerCase();
				const iconName = icon.name.toLowerCase();
	
				// First check if the name matches.
				if ( iconName.includes( input ) ) {
					return true;
				}
	
				return false;
			} );
		} else {
			newIcons = icons;
		}

		// Update state.
		setFilteredIcons( newIcons );
		setSearchInput( search );
	}

	function onClickLibrary( library ) {
		setCurrentLibrary( library );
	}

	let renderedIcons = [];

	// Fetch all icons if no library is selected.
	if ( currentLibrary === '__all' ) {
		renderedIcons = filteredIcons;
	} else {
		// Fetch icons from current library.
		renderedIcons = filteredIcons.filter( icon => currentLibrary === icon?.library );
	}

	return (
		<Modal
			className="wp-block-themezee-advanced-icon-block__icon_modal"
			title={ __( 'Icons' ) }
			onRequestClose={ () => setIconModalOpen( false ) }
			isFullScreen
		>
			<div
				className={ classnames( 'tz-icon-modal', {
					'is-searching': searchInput,
				} ) }
			>
				<div className="tz-icon-modal__sidebar">
					<div className="tz-icon-modal__sidebar__search">
						<SearchControl
							value={ searchInput }
							onChange={ filterIcons }
						/>
					</div>
					<MenuGroup
						className="tz-icon-modal__sidebar__library"
					>
						{ libraries.map( ( library ) => {
							const isActive = currentLibrary ? library.name === currentLibrary : library.name === '__all';
							const libraryIcons = filteredIcons.filter( icon => library.name === icon?.library );

							return (
								<MenuItem
									key={ `library-${ library.name }` }
									className={ classnames( {
										'is-active': isActive,
									} ) }
									onClick={ () => onClickLibrary( library.name ) }
									isPressed={ isActive }
								>
									{ library.title }
									<span className="tz-icon__library__count">
										{ library.name === '__all' ? filteredIcons.length : libraryIcons.length }
									</span>
								</MenuItem>
							);
						} ) }
					</MenuGroup>
					<MenuGroup
						className="tz-icon-modal__sidebar__settings"
						label={ __( 'Settings' ) }
					>
						<ToggleControl
							label={ __( 'Show icon names' ) }
							checked={ showIconNames }
							onChange={ () => {
								setShowIconNames( ( state ) => ! state );
								dispatch( 'core/preferences' ).toggle( 'themezee/advanced-icon-block', 'showIconNames' );
							} }
						/>
						<BaseControl  label={ __( 'Preview Size' ) }>					
							<ButtonGroup>
								{ [ 16, 24, 32, 48, 64 ].map( ( size ) => {
									return (
										<Button
											key={ size }
											isSmall
											variant={ size === iconSize ? 'primary' : undefined }
											onClick={ () => ( function ( value ) {
												setIconSize( value );
												dispatch( 'core/preferences' ).set( 'themezee/advanced-icon-block', 'iconSize', value );
											} )( size ) }
										>
											{ size }px
										</Button>
									);
								} ) }
							</ButtonGroup>
						</BaseControl>
					</MenuGroup>
				</div>
				<div className="tz-icon-modal__content">
					<div className="tz-icon-modal__content-header">
						<div className="search-results">
							{ searchInput &&
								sprintf(
									// translators: %1$s: Number of icons retruned from search, %2$s: the search input
									_n(
										'%1$s search result for "%2$s"',
										'%1$s search results for "%2$s"',
										renderedIcons.length,
									),
									renderedIcons.length,
									searchInput
								)
							}
						</div>
					</div>
					<div className="tz-icon-modal__content-grid">
						{ ! isEmpty( renderedIcons ) && (
							<div
								className={ classnames( 'tz-icon-list', {
									'show-icon-names': showIconNames,
								} ) }
							>
								{ renderedIcons.map( ( icon ) => {
									return (
										<Button
											key={ `icon-${ icon.library }-${ icon.name }` }
											className={ classnames( 'tz-icon-list__item', {
												'is-active': icon.name === attributes?.iconName && icon.library === attributes?.iconLibrary,
											} ) }
											onClick={ () => updateIconName( icon.name, icon.library, icon.icon ) }
										>
											<span className="tz-icon-list__item-icon" style={ { width: `${iconSize}px`, height: `${iconSize}px` } }>
												{ icon.icon }
											</span>
											{ showIconNames && (
												<span className="tz-icon-list__item-name">
													{ icon.name }
												</span>
											) }
										</Button>
									);
								} ) }
							</div>
						) }

						{ isEmpty( renderedIcons ) && (
							<div className="block-editor-modal__no-results">
								<p>{ __( 'No results found.' ) }</p>
							</div>
						) }
					</div>
				</div>
			</div>
		</Modal>
	);
}
