/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks'; 

export default function IconList( props ) {
	const {
		attributes,
		setAttributes,
		enabledLibraries,
		loadedLibraries,
		currentLibrary,
		showIconNames,
		iconSize,
		limit,
		searchInput,
		updateIcons,
		onClose,
	} = props;

	// Retrieve icons from loaded icon scripts.
	const icons = applyFilters( 'themezeeIconBlock.icons', [] );

	// State Hooks.
	const [ availableIcons, setAvailableIcons ] = useState( icons );
	const [ filteredIcons, setFilteredIcons ] = useState( icons );

	/**
	 * Filter icons array based on search term.
	 */
	function filterIcons( search, icons ) {
		let newIcons;

		// Filter icons if search is active.
		if ( search ) {
			const input = search.toLowerCase();
			newIcons = icons.filter( ( icon ) => {
				const iconName = icon.name.toLowerCase();

				// First check if the name matches.
				if ( iconName.includes( input ) ) {
					return true;
				}

				return false;
			} );
		} else {
			newIcons = icons; // Use all icons if search is inactive.
		}

		// Limit icons to a certain number if prop exists.
		if ( limit ) {
			newIcons = newIcons.slice( 0, limit );
		}

		updateIcons( newIcons ); // Pass icons to parent component.
		return newIcons;
	}

	// Update available icons if libraries change.
	useEffect( () => {
		const availableLibraries = enabledLibraries.filter( lib => loadedLibraries.includes( lib ) );
		const newIcons = icons.filter( icon => availableLibraries.includes( icon.library ) );

		setAvailableIcons( newIcons );
		setFilteredIcons( filterIcons( searchInput, newIcons ) );
	}, [ enabledLibraries, loadedLibraries, searchInput ] );

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
		onClose( false );
	}

	let renderedIcons = [];

	// Fetch all icons if no library is selected.
	if ( currentLibrary === '__all' ) {
		renderedIcons = filteredIcons;
	} else {
		// Fetch icons from current library.
		renderedIcons = filteredIcons.filter( icon => currentLibrary === icon?.library );
	}

	// Set isLoading variable if icon libraries are loaded.
	const isLoading = enabledLibraries.filter( library => ! loadedLibraries.includes( library ) ).length > 0;

	return (
		<div className="themezee-icon-picker">
			{ ( ! isEmpty( renderedIcons ) && ! isLoading ) && (
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

			{ isLoading && (
				<div className="themezee-icon-picker__is-loading">
					{ __( 'Icon Sets are loaded...' ) }
				</div>
			) }
		</div>
	);
}
