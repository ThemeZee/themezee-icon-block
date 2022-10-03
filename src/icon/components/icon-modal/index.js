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
	CheckboxControl,
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
import IconPicker from '../icon-picker';
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
		'themezee/advanced-icon-block',
		{
			enabledLibraries: [ '__all', 'wordpress', 'fa-regular' ],
			showIconNames: true,
			iconSize: 32,
		}
	);

	// State Hooks.
	const [ enabledLibraries, setEnabledLibraries ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'enabledLibraries' ) );
	const [ showIconNames, setShowIconNames ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'showIconNames' ) );
	const [ iconSize, setIconSize ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'iconSize' ) );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ currentLibrary, setCurrentLibrary ] = useState( attributes.iconLibrary );
	const [ icons, setIcons ] = useState( [] );
	const [ childData, setChildData ] = useState( {} );

	// Get data from child component (IconPicker).
	const updateChildData = ( data ) => {
		setChildData( data );
	};

	// Get icon from child component (IconList).
	const updateIcons = icons => {
		setIcons( icons );
	}

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
					{ availableLibraries.map( ( library ) => {
							const isActive = currentLibrary ? library.name === currentLibrary : library.name === '__all';
							const libraryIcons = availableIcons.filter( icon => library.name === icon?.library );

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
										{ library.name === '__all' ? availableIcons.length : libraryIcons.length }
									</span>
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

						const showLoadingText = enabledLibraries.includes( library.name ) && ! availableLibraries.map( lib => lib.name ).includes( library.name );
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
			</div>

			<div className="tz-icon-modal__content">
				<IconPicker
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
				/>
			</div>
		</div>

		</Modal>
	);
}
