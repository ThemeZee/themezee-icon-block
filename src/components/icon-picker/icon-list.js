/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, _n } from '@wordpress/i18n';
import { Button, Flex, FlexItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { chevronLeft, chevronRight } from '@wordpress/icons';

export default function IconList( props ) {
	const {
		attributes,
		setAttributes,
		filteredIcons,
		currentLibrary,
		showIconNames,
		iconSize,
		onClose,
		showPagination = false,
		iconsPerPage = 100,
	} = props;

	function updateIconName( name, library, svg ) {
		setAttributes( {
			iconName: name,
			iconLibrary: library,
			iconSVG: svg,
		} );
		onClose( false );
	}

	// State Hooks.
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ iconsLimit, setIconsLimit ] = useState( iconsPerPage );

	let selectedIcons = [];
	let renderedIcons = [];

	// Fetch all icons if no library is selected.
	if ( currentLibrary === '__all' ) {
		selectedIcons = filteredIcons;
	} else {
		// Fetch icons from current library.
		selectedIcons = filteredIcons.filter( icon => currentLibrary === icon?.library );
	}

	// Do not show all icons at once.
	renderedIcons = selectedIcons.slice( ( currentPage - 1 ) * iconsPerPage, iconsLimit );

	// Calculate number of pages.
	const pageCount = Math.ceil( selectedIcons.length / iconsPerPage );

	console.log( currentPage, ( currentPage - 1 ) * iconsPerPage, iconsLimit, pageCount );

	return (
		<>
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

			{ ( selectedIcons.length > iconsLimit && ! showPagination ) && (
				<Button
					isPrimary
					className="show-more-button"
					onClick={ () => setIconsLimit( iconsLimit + iconsPerPage ) }
				>
					{ __( 'Show more' ) }
				</Button>
			) }

			{ showPagination && (
				<Flex className="pagination">
					<FlexItem>
						<Button
							isSecondary
							isSmall
							icon={ chevronLeft }
							label={ __( 'Previous' ) }
							disabled={ currentPage > 1 ? false : true }
							onClick={ () => {
								if ( currentPage > 1 ) {
									setIconsLimit( iconsLimit - iconsPerPage );
									setCurrentPage( currentPage - 1 );
								}
							} }
						/>
						<Button
							isSecondary
							isSmall
							icon={ chevronRight }
							label={ __( 'Next' ) }
							disabled={ currentPage < pageCount ? false : true }
							onClick={ () => {
								if ( currentPage < pageCount ) {
									setIconsLimit( iconsLimit + iconsPerPage );
									setCurrentPage( currentPage + 1 );
								}
							} }
						/>
					</FlexItem>

					<FlexItem className="page-numbers">
						{ currentPage } / { pageCount }
					</FlexItem>
				</Flex>
			) }
		</>
	);
}
