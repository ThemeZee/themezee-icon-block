/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, _n } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
 
export default function IconList( props ) {
	const {
		attributes,
		setAttributes,
		filteredIcons,
		currentLibrary,
		showIconNames,
		iconSize,
		onClose,
	} = props;

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

	return (
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
	);
}
