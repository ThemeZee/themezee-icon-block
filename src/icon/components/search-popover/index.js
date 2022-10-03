/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, _n } from '@wordpress/i18n';
import {
	Button,
	Popover,
	SearchControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { libraries } from '../../libraries';
import IconPicker from '../icon-picker';
import './style.scss';

export default function SearchPopover( props ) {
	const {
		setIconModalOpen,
		isSearchPopoverOpen,
		setSearchPopoverOpen,
		attributes,
		setAttributes,
		anchorRef,
	} = props;

	if ( ! isSearchPopoverOpen ) {
		return null;
	}

	// State Hooks.
	const [ enabledLibraries, setEnabledLibraries ] = useState( select( 'core/preferences' ).get( 'themezee/advanced-icon-block', 'enabledLibraries' ) );
	const [ searchInput, setSearchInput ] = useState( '' );
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

	function getDefaultIcons( icons ) {
		const defaultIcons = [
			'bell',
			'calendar',
			'clock',
			'comment',
			'envelope',
			'heart',
			'image',
			'lightbulb',
			'pen-to-square',
			'star',
			'thumbs-up',
			'user',
		];

		return icons.filter( ( icon ) => ( defaultIcons.includes( icon.name ) && icon.library === 'fa-regular' ) );
	}

	const availableIcons = icons ? icons : [];
	const availableLibraries = childData?.availableLibraries ? childData?.availableLibraries : libraries;
	const isLoading = childData?.isLoading ? childData?.isLoading : false;

	return (
		<Popover
			className="wp-block-themezee-icon-block__search-popover block-editor-inserter__popover is-quick"
			position="bottom center"
			onClose={ () => {
				setSearchPopoverOpen( false );
				anchorRef?.focus();
			} }
			anchorRef={ anchorRef }
		>
			<div className="block-editor-inserter__quick-inserter">
				<SearchControl
					className="block-editor-inserter__search"
					label={ __( 'Search icons' ) }
					hideLabelFromVision={ true }
					value={ searchInput }
					onChange={ ( value ) => setSearchInput( value ) }
				/>
					<div className="block-editor-inserter__quick-inserter-results">			
						<IconPicker
							attributes={ attributes }
							setAttributes={ setAttributes }
							libraries={ libraries }
							enabledLibraries={ enabledLibraries }
							searchInput={ searchInput }
							updateChildData={ updateChildData }
							updateIcons={ updateIcons }
							onClose={ setSearchPopoverOpen }
						/>

						{ isEmpty( availableIcons ) && (
							<div className="block-editor-modal__no-results">
								<p>{ __( 'No results found.' ) }</p>
								<Button
									variant="primary"
									onClick={ () => {
										setIconModalOpen( true );
										setSearchPopoverOpen( false );
										setSearchInput( '' );
									} }
								>
									{ __( 'Browse all icons' ) }
								</Button>
							</div>
						) }
					</div>
			</div>
		</Popover>
	);
}
