/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import getIcons from './icons';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( {attributes} ) {
	const {
		iconName,
		iconLibrary,
		iconWidth,
		iconHeight,
	} = attributes;

	const iconsObject = getIcons();
	const icons = iconsObject.icons;
	const selectedIcon = icons.filter( ( i ) => ( i.name === iconName && i.library === iconLibrary ) );
	const iconSVG = ! isEmpty( selectedIcon ) ? selectedIcon[ 0 ].icon : defaultIcon;

	const iconClasses = classnames( 'icon-wrap', {
		[ `icon-name-${ iconName }` ]: iconName,
		[ `icon-library-${ iconLibrary }` ]: iconLibrary,
	} );

	const iconStyles = {
		width: iconWidth,
		height: iconHeight,
	};

	const iconMarkup = (
		<span className={ iconClasses } style={ iconStyles }>
			{ iconSVG }
		</span>
	);

	return (
		<div { ...useBlockProps.save() }>
			{ iconMarkup }
		</div>
	);
}
