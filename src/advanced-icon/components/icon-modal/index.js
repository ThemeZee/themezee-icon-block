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
	CheckboxControl,
	MenuGroup,
	MenuItem,
	Modal,
	SearchControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { store as preferencesStore } from '@wordpress/preferences';
import { applyFilters } from '@wordpress/hooks'; 

/**
 * Internal dependencies
 */
import IconPicker from './icon-picker';
import './style.scss';

const libraries = [
	{
		name: '__all',
		title: __( 'All Icons' ),
	},
	{
		name: 'fa-brands',
		title: __( 'Font Awesome (Brands)' ),
		scriptId: 'themezee-advanced-icon-block-fa-brands',
		scriptUrl: 'fa-brands/index.js',
	},
	{
		name: 'fa-regular',
		title: __( 'Font Awesome (Regular)' ),
		scriptId: 'themezee-advanced-icon-block-fa-regular',
		scriptUrl: 'fa-regular/index.js',
	},
	{
		name: 'fa-solid',
		title: __( 'Font Awesome (Solid)' ),
		scriptId: 'themezee-advanced-icon-block-fa-solid',
		scriptUrl: 'fa-solid/index.js',
	},
	{
		name: 'material-filled',
		title: __( 'Material Icons (Filled)' ),
		scriptId: 'themezee-advanced-icon-block-material-filled',
		scriptUrl: 'material-filled/index.js',
	},
	{
		name: 'material-outlined',
		title: __( 'Material Icons (Outlined)' ),
		scriptId: 'themezee-advanced-icon-block-material-outlined',
		scriptUrl: 'material-outlined/index.js',
	},
	{
		name: 'wordpress',
		title: __( 'WordPress' ),
	},
];

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

	// Return early if public icon variable is not available.
	if ( ! themezeeIconBlockBundle ) {
		return null;
	}

	// Store default preferences.
	dispatch( preferencesStore ).setDefaults(
		'themezee/advanced-icon-block',
		{
			enabledLibraries: [ '__all', 'wordpress', 'fa-regular' ],
			showIconNames: true,
			iconSize: 32,
		}
	);

	// State Hooks.
	const [ enabledLibraries, setEnabledLibraries ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'enabledLibraries' ) );
	const [ loadedLibraries, setLoadedLibraries ] = useState( [ '__all', 'wordpress' ] );
	const [ showIconNames, setShowIconNames ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'showIconNames' ) );
	const [ iconSize, setIconSize ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'iconSize' ) );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ currentLibrary, setCurrentLibrary ] = useState( attributes.iconLibrary );

	// Load Icon Sets.
	useEffect( () => {
		libraries.filter( library => ( 'scriptId' in library ) && enabledLibraries.includes( library.name ) ).map( library => {
			if ( ! document.getElementById( library.scriptId ) ) {
				const script = document.createElement( 'script' );
				script.id = library.scriptId;
				script.type = "text/javascript";
				script.src = themezeeIconBlockBundle.url + library.scriptUrl;
				script.async = true;
				document.body.appendChild( script );

				script.onload = () => {
					setLoadedLibraries( currentSets => [ ...currentSets, library.name ] );
				};

				script.onerror = () => {
					console.log( "There was an error loading ", library.scriptUrl );
					setEnabledLibraries( enabledLibraries.filter( current => current !== library.name ) );
					dispatch( 'core/preferences' ).set( 'themezee/advanced-icon-block', 'enabledLibraries', enabledLibraries.filter( current => current !== library.name ) );
					script.remove();
				};
			} else {
				setLoadedLibraries( currentSets => [ ...currentSets, library.name ] );
			}
		} );
	}, [ enabledLibraries ] );

	function toggleLibrary( value ) {
		let newLibrary;

		// Check if icon library is already enabled.
		if ( enabledLibraries.includes( value ) ) {
			// Remove library from enabled icon libraries.
			newLibrary = enabledLibraries.filter( library => library !== value );
		} else {
			// Add icon library to enabled icon libraries.
			newLibrary = [ ...enabledLibraries, value ];
		}

		// Update State and preferences.
		setEnabledLibraries( newLibrary );
		dispatch( 'core/preferences' ).set( 'themezee/advanced-icon-block', 'enabledLibraries', newLibrary );
	}

	function onClickLibrary( library ) {
		setCurrentLibrary( library );
	}

	const availableLibraries = libraries.filter( library => {
		// Return early if icon library is not enabled or loaded.
		if ( ! enabledLibraries.includes( library.name ) || ! loadedLibraries.includes( library.name ) ) {
			return false;
		}
		return true;
	} );

	// Set isLoading variable if icon libraries are loaded.
	const isLoading = enabledLibraries.filter( library => ! loadedLibraries.includes( library ) ).length > 0;

	const sidebarControls = (
		<>
			<div className="tz-icon-modal__sidebar__search">
				<SearchControl
					value={ searchInput }
					onChange={ ( value ) => setSearchInput( value ) }
				/>
			</div>

			<MenuGroup
				className="tz-icon-modal__sidebar__library"
			>
				{ availableLibraries.map( ( library ) => {
					const isActive = currentLibrary ? library.name === currentLibrary : library.name === '__all';

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
						</MenuItem>
					);
				} ) }
			</MenuGroup>

			<MenuGroup
				className="tz-icon-modal__sidebar__preferences"
				label={ __( 'Preferences' ) }
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

			<MenuGroup
				className="tz-icon-modal__sidebar__icon-libraries"
				label={ __( 'Icon Sets' ) }
			>
				{ libraries.map( ( library ) => {
					// Return early for all icon libraries.
					if ( library.name === '__all' ) {
						return;
					}

					const showLoadingText = enabledLibraries.includes( library.name ) && ! loadedLibraries.includes( library.name );
					return (
						<CheckboxControl
							key={ library.name }
							label={ library.title }
							checked={ enabledLibraries.includes( library.name ) }
							onChange={ () => toggleLibrary( library.name ) }
							disabled={ isLoading }
							help={ showLoadingText ? __( 'Icon Set is loaded...' ) : '' }
						/>
					);
				} ) }
			</MenuGroup>
		</>
	);

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
				{ sidebarControls }
			</div>

			<div className="tz-icon-modal__content">
				<IconPicker
					setIconModalOpen={ setIconModalOpen }
					attributes={ attributes }
					setAttributes={ setAttributes }
					libraries={ availableLibraries }
					currentLibrary={ currentLibrary }
					showIconNames={ showIconNames }
					iconSize={ iconSize }
					searchInput={ searchInput }
				/>
			</div>
		</div>

		</Modal>
	);
}
