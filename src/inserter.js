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
	Button,
	MenuGroup,
	MenuItem,
	Modal,
	RangeControl,
	SearchControl,
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import getIcons from './icons';

export default function InserterModal( props ) {
	const {
		isInserterOpen,
		setInserterOpen,
		attributes,
		setAttributes,
	} = props;

	if ( ! isInserterOpen ) {
		return null;
	}

	const iconsObject = getIcons();
	const icons = iconsObject.icons;
	const libraries = iconsObject.libraries;

	// State Hooks.
	const [ filteredIcons, setFilteredIcons ] = useState( icons );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ currentLibrary, setCurrentLibrary ] = useState( attributes.iconLibrary );
	const [ iconSize, setIconSize ] = useState( 32 );
	const [ showIconNames, setShowIconNames ] = useState( false );

	function updateIconName( name, library ) {
		setAttributes( {
			iconName: name,
			iconLibrary: library,
		} );
		setInserterOpen( false );
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
			className="wp-block-themezee-advanced-icon-block-inserter__modal"
			title={ __( 'Icon Library' ) }
			onRequestClose={ () => setInserterOpen( false ) }
			isFullScreen
		>
			<div
				className={ classnames( 'tz-icon-inserter', {
					'is-searching': searchInput,
				} ) }
			>
				<div className="tz-icon-inserter__sidebar">
					<div className="tz-icon-inserter__sidebar__search">
						<SearchControl
							value={ searchInput }
							onChange={ filterIcons }
						/>
					</div>
					<MenuGroup
						className="tz-icon-inserter__sidebar__library"
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
						className="tz-icon-inserter__sidebar__settings"
						label={ __( 'Settings' ) }
					>
						<RangeControl
							label={ __( 'Preview Size' ) }
							min={ 16 }
							max={ 72 }
							initialPosition={ 32 }
							withInputField={ true }
							onChange={ ( value ) =>
								setIconSize( value )
							}
						/>
						<ToggleControl
							label={ __( 'Show icon names' ) }
							checked={ showIconNames }
							onChange={ () => {
								setShowIconNames( ( state ) => ! state );
							} }
						/>
						
					</MenuGroup>
				</div>
				<div className="tz-icon-inserter__content">
					<div className="tz-icon-inserter__content-header">
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
								) }
						</div>
					</div>
					<div className="tz-icon-inserter__content-grid">
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
											onClick={ () => updateIconName( icon.name, icon.library ) }
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
							<div className="block-editor-inserter__no-results">
								<p>{ __( 'No results found.' ) }</p>
							</div>
						) }
					</div>
				</div>
			</div>
		</Modal>
	);
}
