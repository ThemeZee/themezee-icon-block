/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	Popover,
	SearchControl,
	Tooltip,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getIcons } from './../../icons';
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

	const iconsObject = getIcons();
	const icons = iconsObject.icons;

	// State Hooks.
	const [ filteredIcons, setFilteredIcons ] = useState( icons );
	const [ searchInput, setSearchInput ] = useState( '' );

	function updateIconName( name, library, svg ) {
		setAttributes( {
			iconName: name,
			iconLibrary: library,
			iconSVG: svg,
		} );
		setSearchPopoverOpen( false );
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

	// Only render a few icons.
	let renderedIcons;
	if ( ! searchInput ) {
		// Set popular default icons if not searched.
		renderedIcons = getDefaultIcons( filteredIcons );
	} else {
		// Limit search results to 12 icons.
		renderedIcons = filteredIcons.slice( 0, 12 );
	}

	return (
		<Popover
			className="wp-block-themezee-advanced-icon-block__search-popover block-editor-inserter__popover is-quick"
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
					onChange={ filterIcons }
				/>
					<div className="block-editor-inserter__quick-inserter-results">			
						{ ! isEmpty( renderedIcons ) && (
							<div className="tz-icon-list">
								{ renderedIcons.map( ( icon ) => {
									return (
										<Tooltip text={ icon.name }>
												<Button
												key={ `icon-${ icon.library }-${ icon.name }` }
												className={ classnames( 'tz-icon-list__item', {
													'is-active': icon.name === attributes?.iconName && icon.library === attributes?.iconLibrary,
												} ) }
												onClick={ () => updateIconName( icon.name, icon.library, icon.icon ) }
											>
												<span className="tz-icon-list__item-icon">
													{ icon.icon }
												</span>
											</Button>
										</Tooltip>
									);
								} ) }
							</div>
						) }

						{ isEmpty( renderedIcons ) && (
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
