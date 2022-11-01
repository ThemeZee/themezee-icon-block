/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, _n } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks'; 

/**
 * Internal dependencies
 */
import IconList from './icon-list';
import './style.scss';
 
export default function IconPicker( props ) {
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

	// Set isLoading variable if icon libraries are loaded.
	const isLoading = enabledLibraries.filter( library => ! loadedLibraries.includes( library ) ).length > 0;

	return (
		<div className="themezee-icon-picker">
			{ ( ! isEmpty( filteredIcons ) && ! isLoading ) && (
				<IconList
					attributes={ attributes }
					setAttributes={ setAttributes }
					filteredIcons={ filteredIcons }
					currentLibrary={ currentLibrary }
					showIconNames={ showIconNames }
					iconSize={ iconSize }
					onClose={ onClose }
					iconsPerPage={ 150 }
				/>
			) }

			{ isLoading && (
				<div className="themezee-icon-picker__is-loading">
					{ __( 'Icon Sets are loaded...' ) }
				</div>
			) }
		</div>
	);
}
