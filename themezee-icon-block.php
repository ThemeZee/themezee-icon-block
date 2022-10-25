<?php
/**
 * Plugin Name:       ThemeZee Icon Block
 * Description:       Display a SVG icon.
 * Requires at least: 6.0
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            ThemeZee
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       themezee-icon-block
 *
 * @package           ThemeZee Icon Block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_themezee_icon_block() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'register_themezee_icon_block' );


function register_themezee_icon_block_default_icons() {
	wp_enqueue_script(
		'themezee-icon-block-default-icons',
		plugins_url( '/assets/icons/default-icons.js', __FILE__ ),
		array( 'wp-hooks', 'wp-dom' ),
		'20220927',
		true
	);

	// Passing url to default-icons.js.
	wp_localize_script( 'themezee-icon-block-default-icons', 'themezeeIconBlock', array(
		'url' => plugins_url( '/assets/icons/', __FILE__ ),
	) );
}
add_action( 'enqueue_block_editor_assets', 'register_themezee_icon_block_default_icons' );
