/**
 * External dependencies
 */
import classnames from 'classnames';
import parse from 'html-react-parser';

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
		blockWidth,
		iconName,
		iconLibrary,
		iconSVG,
		iconWidth,
		iconHeight,
		justification,
		rotate,
		flipHorizontal,
		flipVertical,
		url,
		linkTarget,
		rel,
		label,
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
		width: blockWidth ? blockWidth : undefined,
	};

	const iconClasses = classnames( 'icon', {
		[ `icon-name-${ iconName }` ]: iconName,
		[ `icon-library-${ iconLibrary }` ]: iconLibrary,
	} );

	const iconStyles = {
		width: iconWidth,
		height: iconHeight,
	};

	// If icon is retrieved from post body as string, then parse and convert it to React element.
	const iconElement = typeof iconSVG === 'string' ? parse( iconSVG, { trim: true } ) : iconSVG;

	const figure = (
		<figure className={ iconClasses } style={ iconStyles } aria-label={ label ? label : undefined }>
			{ iconElement }
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
