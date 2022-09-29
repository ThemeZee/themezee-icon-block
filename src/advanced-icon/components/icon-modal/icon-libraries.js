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
	SearchControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks'; 

export default function IconPicker( props ) {
	const {
		setIconModalOpen,
		attributes,
		setAttributes,
		libraries,
		showIconNames,
		iconSize,
		searchInput,
		controls,
	} = props;

	// Retrieve icons from loaded icon scripts.
	const icons = applyFilters( 'themezeeAdvancedIconBlock.icons', [] );

	// State Hooks.
	const [ availableIcons, setAvailableIcons ] = useState( icons );
	const [ filteredIcons, setFilteredIcons ] = useState( icons );
	const [ currentLibrary, setCurrentLibrary ] = useState( attributes.iconLibrary );

	/**
	 * Filter icons array based on search term.
	 */
	function filterIcons( search, icons ) {
		// Filter icons if search is active.
		if ( search ) {
			const input = search.toLowerCase();
			return icons.filter( ( icon ) => {
				const iconName = icon.name.toLowerCase();

				// First check if the name matches.
				if ( iconName.includes( input ) ) {
					return true;
				}

				return false;
			} );
		} else {
			return icons;
		}
	}

	// Update available icons if libraries change.
	useEffect( () => {
		const librarySlugs = libraries.map( lib => lib.name );
		const newIcons = icons.filter( icon => librarySlugs.includes( icon.library ) );

		setAvailableIcons( newIcons );
		setFilteredIcons( filterIcons( searchInput, newIcons ) );
	}, [ libraries ] );

	// Update filtered icons if search term changes.
	useEffect( () => {
		setFilteredIcons( filterIcons( searchInput, availableIcons ) );
	}, [ searchInput ] );

	function updateIconName( name, library, svg ) {
		setAttributes( {
			iconName: name,
			iconLibrary: library,
			iconSVG: svg,
		} );
		setIconModalOpen( false );
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
		<div
			className={ classnames( 'tz-icon-modal', {
				'is-searching': searchInput,
			} ) }
		>
			<div className="tz-icon-modal__sidebar">
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

				{ controls }

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
	);
}
