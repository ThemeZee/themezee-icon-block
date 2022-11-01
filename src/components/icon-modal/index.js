/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, _n } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	ButtonGroup,
	Flex,
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
import { libraries } from '../../libraries';
import LibrariesControl from '../libraries-control';
import IconLoader from '../icon-loader';
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

	// Store default preferences.
	dispatch( preferencesStore ).setDefaults(
		'themezee/icon-block',
		{
			enabledLibraries: [ '__all', 'wordpress', 'fa-regular' ],
			showIconNames: true,
			iconSize: 32,
		}
	);

	// State Hooks.
	const [ enabledLibraries, setEnabledLibraries ] = useState( select( 'core/preferences' ).get( 'themezee/icon-block', 'enabledLibraries' ) );
	const [ isSettingsOpen, setSettingsOpen ] = useState( false );
	const [ showIconNames, setShowIconNames ] = useState( select( 'core/preferences' ).get( 'themezee/icon-block', 'showIconNames' ) );
	const [ iconSize, setIconSize ] = useState( select( 'core/preferences' ).get( 'themezee/icon-block', 'iconSize' ) );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ currentLibrary, setCurrentLibrary ] = useState( '__all' );
	const [ icons, setIcons ] = useState( [] );
	const [ childData, setChildData ] = useState( {} );

	// Get data from child component (IconLoader).
	const updateChildData = ( data ) => {
		setChildData( data );
	};

	// Get icon from child component (IconPicker).
	const updateIcons = icons => {
		setIcons( icons );
	}

	function enableLibrary( value ) {
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
		dispatch( 'core/preferences' ).set( 'themezee/icon-block', 'enabledLibraries', newLibrary );
	}

	function changeCurrentLibrary( library ) {
		setCurrentLibrary( library );
	}

	const availableIcons = icons ? icons : [];
	const availableLibraries = childData?.availableLibraries ? childData?.availableLibraries : libraries;
	const isLoading = childData?.isLoading ? childData?.isLoading : false;

	return (
		<Modal
			className="wp-block-themezee-icon-block__icon_modal"
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
						label={ __( 'Search icons' ) }
						hideLabelFromVision={ true }
						value={ searchInput }
						onChange={ ( value ) => setSearchInput( value ) }
					/>
				</div>

				<MenuGroup
					className="tz-icon-modal__sidebar__library"
				>		
					<Flex className="modal__sidebar__library-label">
						<BaseControl.VisualLabel as="legend">
							{ __( 'Icon Sets' ) }
						</BaseControl.VisualLabel>

						<Button
							variant="link"
							onClick={ () => setSettingsOpen( ! isSettingsOpen ) }
						>
							{ __( 'Settings', 'icon-block' ) }
						</Button>
					</Flex>

					{ isSettingsOpen && (
						<LibrariesControl
							availableLibraries={ availableLibraries }
							enabledLibraries={ enabledLibraries }
							isLoading={ isLoading }
							onChange={ enableLibrary }
						/>
					) }

					{ ! isSettingsOpen && (
						availableLibraries.map( ( library ) => {
							const isActive = currentLibrary ? library.name === currentLibrary : library.name === '__all';
							const libraryIcons = availableIcons.filter( icon => library.name === icon?.library );

							return (
								<MenuItem
									key={ `library-${ library.name }` }
									className={ classnames( {
										'is-active': isActive,
									} ) }
									onClick={ () => changeCurrentLibrary( library.name ) }
									isPressed={ isActive }
								>
									{ library.title }
									<span className="tz-icon__library__count">
										{ library.name === '__all' ? availableIcons.length : libraryIcons.length }
									</span>
								</MenuItem>
							);
						} )
					) }

				</MenuGroup>

				<MenuGroup
					className="tz-icon-modal__sidebar__preferences"
				>
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
											dispatch( 'core/preferences' ).set( 'themezee/icon-block', 'iconSize', value );
										} )( size ) }
									>
										{ size }px
									</Button>
								);
							} ) }
						</ButtonGroup>
					</BaseControl>

					<ToggleControl
						label={ __( 'Show icon names' ) }
						checked={ showIconNames }
						onChange={ () => {
							setShowIconNames( ( state ) => ! state );
							dispatch( 'core/preferences' ).toggle( 'themezee/icon-block', 'showIconNames' );
						} }
					/>
				</MenuGroup>
			</div>

			<div className="tz-icon-modal__content">
				{ searchInput && (
					<div className="search-results">
						{ sprintf(
							// translators: %1$s: Number of icons returned from search, %2$s: the search input, %3$s: current icon set
							_n(
								'%1$s search result for "%2$s" in %3$s. ',
								'%1$s search results for "%2$s" in %3$s. ',
								currentLibrary === '__all' ? availableIcons.length : availableIcons.filter( icon => currentLibrary === icon?.library ).length,
							),
							currentLibrary === '__all' ? availableIcons.length : availableIcons.filter( icon => currentLibrary === icon?.library ).length,
							searchInput,
							libraries.filter( lib => lib.name === currentLibrary )[0].title
						) }

						{ ! ( currentLibrary === '__all' ) && (
							<Button
								variant="link"
								onClick={ () => changeCurrentLibrary( '__all' ) }
							>
								{ __( 'Search all icon sets' ) }
							</Button>
						) }
					</div>
				) }

				<IconLoader
					attributes={ attributes }
					setAttributes={ setAttributes }
					libraries={ libraries }
					enabledLibraries={ enabledLibraries }
					currentLibrary={ currentLibrary }
					showIconNames={ showIconNames }
					iconSize={ iconSize }
					searchInput={ searchInput }
					updateChildData={ updateChildData }
					updateIcons={ updateIcons }
					onClose={ setIconModalOpen }
					showPagination={ false }
					iconsPerPage={ 150 }
				/>
			</div>
		</div>

		</Modal>
	);
}
