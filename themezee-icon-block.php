<?php
/**
 * Plugin Name:       ThemeZee Icon Block
 * Description:       Display a SVG icon.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0
 * Author:            ThemeZee
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       themezee-icon-block
 *
 * @package           ThemeZee Icon Block
 * 
 * The ThemeZee Icon Block is a derivative work of the Icon Block plugin by Nick Diego (https://github.com/ndiego/icon-block),
 * which is licensed GPLv2. This code therefore is also licensed under the terms of the GNU Public License, version 2.
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_themezee_icon_block() {

	// Load translation for PHP files.
	load_plugin_textdomain( 'themezee-icon-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	// Register Block.
	register_block_type( __DIR__ . '/build', [
		'title'       => _x( 'Icon', 'block title', 'themezee-icon-block' ),
		'description' => _x( 'Display a SVG icon.', 'block description', 'themezee-icon-block' ),
	] );

	// Load translation for JS files.
	wp_set_script_translations( 'themezee-icon-editor-script', 'themezee-icon-block', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'register_themezee_icon_block' );


/**
 * Load the default icon set.
 */
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


if ( ! function_exists( 'register_themezee_blocks_block_category' ) ) :
	/**
	 * Add ThemeZee Blocks category to Block Inserter.
	 */
	function register_themezee_blocks_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'themezee-blocks',
					'title' => __( 'ThemeZee Blocks', 'themezee-icon-block' ),
				),
			)
		);
	}
	add_filter( 'block_categories_all', 'register_themezee_blocks_block_category', 10, 2 );
endif;


/**
 * Set up the Plugin Updater Constants.
 */
define( 'THEMEZEE_ICON_BLOCK_VERSION', '1.0' );
define( 'THEMEZEE_ICON_BLOCK_NAME', 'ThemeZee Icon Block' );
define( 'THEMEZEE_ICON_BLOCK_ID', 255875 );
define( 'THEMEZEE_ICON_BLOCK_STORE_URL', 'https://themezee.com' );


/**
 * Include License Settings and Plugin Updater.
 */
include dirname( __FILE__ ) . '/includes/class-themezee-blocks-admin-page.php';
include dirname( __FILE__ ) . '/includes/class-themezee-icon-block-license-settings.php';
include dirname( __FILE__ ) . '/includes/class-themezee-icon-block-updater.php';


/**
 * Initialize the updater. Hooked into `init` to work with the
 * wp_version_check cron job, which allows auto-updates.
 */
function update_themezee_icon_block() {

	// To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
	$doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
	if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
		return;
	}

	// Retrieve our license key from the DB.
	$options     = get_option( 'themezee_blocks_settings', array() );
	$license_key = ! empty( $options['icon_block_license_key'] ) ? trim( $options['icon_block_license_key'] ) : false;

	// Setup the updater.
	$edd_updater = new ThemeZee_Icon_Block_Updater(
		THEMEZEE_ICON_BLOCK_STORE_URL,
		__FILE__,
		array(
			'version' => THEMEZEE_ICON_BLOCK_VERSION,
			'license' => $license_key,
			'item_id' => THEMEZEE_ICON_BLOCK_ID,
			'author'  => 'ThemeZee',
			'beta'    => false,
		)
	);
}
add_action( 'init', 'update_themezee_icon_block' );
