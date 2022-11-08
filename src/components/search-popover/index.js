/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	Flex,
	Popover,
	SearchControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { cog } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { libraries } from '../../libraries';
import LibrariesControl from '../libraries-control';
import IconLoader from '../icon-loader';
import './style.scss';

export default function SearchPopover( props ) {
	const {
		setIconModalOpen,
		isSearchPopoverOpen,
		setSearchPopoverOpen,
		attributes,
		setAttributes,
		anchor,
	} = props;

	if ( ! isSearchPopoverOpen ) {
		return null;
	}

	// State Hooks.
	const [ enabledLibraries, setEnabledLibraries ] = useState( select( 'core/preferences' ).get( 'themezee/icon-block', 'enabledLibraries' ) );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ isSettingsOpen, setSettingsOpen ] = useState( false );
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

	const availableIcons = icons ? icons : [];
	const availableLibraries = childData?.availableLibraries ? childData?.availableLibraries : libraries;
	const isLoading = childData?.isLoading ? childData?.isLoading : false;

	return (
		<Popover
			className="wp-block-themezee-icon__search-popover block-editor-inserter__popover is-quick"
			position="bottom center"
			onClose={ () => {
				setSearchPopoverOpen( false );
				anchor?.focus();
			} }
			anchor={ anchor }
		>
			<div className="block-editor-inserter__quick-inserter">
				<div className="block-editor-inserter__quick-inserter-header">
					<Flex>
						<SearchControl
							label={ __( 'Search icons', 'themezee-icon-block' ) }
							hideLabelFromVision={ true }
							value={ searchInput }
							onChange={ ( value ) => setSearchInput( value ) }
						/>

						<Button
							isSecondary
							icon={ cog }
							label={ __( 'Enable Icon Sets', 'themezee-icon-block' ) }
							onClick={ () => setSettingsOpen( ! isSettingsOpen ) }
						/>
					</Flex>

					{ isSettingsOpen && (
						<LibrariesControl
							availableLibraries={ availableLibraries }
							enabledLibraries={ enabledLibraries }
							isLoading={ isLoading }
							onChange={ enableLibrary }
						/>
					) }
				</div>

				<div className="block-editor-inserter__quick-inserter-results">			
					<IconLoader
						attributes={ attributes }
						setAttributes={ setAttributes }
						libraries={ libraries }
						enabledLibraries={ enabledLibraries }
						currentLibrary="__all"
						iconSize = { 25 }
						searchInput={ searchInput }
						updateChildData={ updateChildData }
						updateIcons={ updateIcons }
						onClose={ setSearchPopoverOpen }
						showPagination={ true }
						iconsPerPage={ 15 }
					/>

					{ isEmpty( availableIcons ) && (
						<div className="block-editor-modal__no-results">
							<p>{ __( 'No results found.', 'themezee-icon-block' ) }</p>
							<Button
								variant="primary"
								onClick={ () => {
									setIconModalOpen( true );
									setSearchPopoverOpen( false );
									setSearchInput( '' );
								} }
							>
								{ __( 'Browse all icons', 'themezee-icon-block' ) }
							</Button>
						</div>
					) }
				</div>
			</div>
		</Popover>
	);
}
