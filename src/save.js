/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';

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
		justification,
		rotate,
		flipHorizontal,
		flipVertical,
		url,
		linkTarget,
		rel,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: classnames( {
			[ `items-justified-${ justification }` ]: justification,
			[ `rotate-${ rotate }` ]: rotate,
			'flip-horizontal': flipHorizontal,
			'flip-vertical': flipVertical,
		} ),
	} );

	const borderProps = getBorderClassesAndStyles( attributes );
	const colorProps = getColorClassesAndStyles( attributes );
	const spacingProps = getSpacingClassesAndStyles( attributes );

	const containerClasses = classnames(
		'icon-container',
		colorProps.className,
		borderProps.className,
	);

	const containerStyles = {
		...borderProps.style,
		...colorProps.style,
		...spacingProps.style,
	};

	const iconClasses = classnames( 'icon', {
		[ `icon-name-${ iconName }` ]: iconName,
		[ `icon-library-${ iconLibrary }` ]: iconLibrary,
	} );

	const iconStyles = {
		width: iconWidth,
		height: iconHeight,
	};

	const iconsObject = getIcons();
	const icons = iconsObject.icons;
	const findIcon = icons.filter( ( i ) => ( i.name === iconName && i.library === iconLibrary ) );
	const selectedIcon = ! isEmpty( findIcon ) ? findIcon[ 0 ].icon : defaultIcon;

	// Return early if icon is missing.
	if ( ! selectedIcon ) {
		return null;
	}

	// Make sure all icons have aria-hidden and focusable attributes.
	const iconSVG = {
		...selectedIcon,
		props: { ...selectedIcon.props, 'aria-hidden': true, 'focusable': false },
	};

	const figure = (
		<figure className={ iconClasses } style={ iconStyles }>
			{ iconSVG }
		</figure>
	);

	const iconMarkup = url ? (
		<a
			className={ containerClasses }
			href={ url }
			target={ linkTarget }
			rel={ rel }
			style={ containerStyles }
		>
			{ figure }
		</a>
	) : (
		<div className={ containerClasses } style={ containerStyles }>
			{ figure }
		</div>
	);

	return (
		<div { ...blockProps }>
			{ iconMarkup }
		</div>
	);
}
