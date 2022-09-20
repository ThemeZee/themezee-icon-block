<?php
/**
 * Plugin Name:       Advanced Icon Block
 * Description:       Display a SVG icon.
 * Requires at least: 6.0
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            ThemeZee
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       advanced-icon-block
 *
 * @package           Advanced Icon Block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_themezee_advanced_icon_block() {
	register_block_type( __DIR__ . '/build/advanced-icon' );
	register_block_type( __DIR__ . '/build/icon-button' );
	register_block_type( __DIR__ . '/build/icon-buttons' );
}
add_action( 'init', 'register_themezee_advanced_icon_block' );


function register_themezee_advanced_icon_block_variations() {
	wp_enqueue_script(
		'themezee-advanced-icon-block-variations',
		plugins_url( '/build/block-variations/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-primitives', 'wp-dom-ready', 'wp-edit-post' ),
		filemtime( plugin_dir_path( __FILE__ ) . '/build/block-variations/index.js' )
	);
}
add_action( 'enqueue_block_editor_assets', 'register_themezee_advanced_icon_block_variations' );
