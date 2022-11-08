/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './style.scss';
import IconPicker from '../icon-picker';

export default function IconLoader( props ) {
	const {
		attributes,
		setAttributes,
		libraries,
		enabledLibraries,
		currentLibrary = "__all",
		showIconNames = false,
		iconSize = 32,
		searchInput,
		updateChildData,
		updateIcons,
		onClose,
		showPagination,
		iconsPerPage,
	} = props;

	// Return early if public icon variable is not available.
	if ( ! themezeeIconBlock ) {
		return null;
	}

	// State Hooks.
	const [ loadedLibraries, setLoadedLibraries ] = useState( [ '__all', 'wordpress' ] );

	// Load Icon Sets.
	useEffect( () => {
		libraries.filter( library => ( 'scriptId' in library ) && enabledLibraries.includes( library.name ) ).map( library => {
			if ( ! document.getElementById( library.scriptId ) ) {
				const script = document.createElement( 'script' );
				script.id = library.scriptId;
				script.type = "text/javascript";
				script.src = themezeeIconBlock.url + library.scriptUrl;
				script.async = true;
				document.body.appendChild( script );

				script.onload = () => {
					setLoadedLibraries( currentSets => [ ...currentSets, library.name ] );
				};

				script.onerror = () => {
					console.log( "There was an error loading ", library.scriptUrl );
					script.remove();
				};
			} else {
				setLoadedLibraries( currentSets => [ ...currentSets, library.name ] );
			}
		} );
	}, [ enabledLibraries ] );

	// Pass data to parent component.
	useEffect( () => {
		// Set available libraries, which are enabled and loaded.
		const availableLibraries = libraries.filter( library => {
			// Return early if icon library is not enabled or loaded.
			if ( ! enabledLibraries.includes( library.name ) || ! loadedLibraries.includes( library.name ) ) {
				return false;
			}
			return true;
		} );

		// Set isLoading variable if icon libraries are loaded.
		const isLoading = enabledLibraries.filter( library => ! loadedLibraries.includes( library ) ).length > 0;

		// Pass data to parent component.
		updateChildData( {
			availableLibraries,
			isLoading,
		} );
	}, [ enabledLibraries, loadedLibraries ] );

	return (
		<IconPicker
			attributes={ attributes }
			setAttributes={ setAttributes }
			enabledLibraries={ enabledLibraries }
			loadedLibraries={ loadedLibraries }
			currentLibrary={ currentLibrary }
			showIconNames={ showIconNames }
			iconSize={ iconSize }
			searchInput={ searchInput }
			updateIcons={ updateIcons }
			onClose={ onClose }
			showPagination={ showPagination }
			iconsPerPage={ iconsPerPage }
		/>
	);
}
