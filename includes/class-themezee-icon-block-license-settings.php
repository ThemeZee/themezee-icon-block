<?php
/**
 * ThemeZee Icon Block License Settings
 *
 * @package ThemeZee Icon Block
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class ThemeZee_Icon_Block_License_Settings {

	/**
	 * Setup the ThemeZee Plugins Settings class
	 */
	static function setup() {

		// Register settings.
		add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
	}

	/**
	 * Get settings
	 *
	 * @return array
	 */
	static function get_settings() {
		$default_settings = array(
			'icon_block_license_key'    => '',
			'icon_block_license_status' => 'inactive',
		);

		return wp_parse_args( get_option( 'themezee_blocks_settings', array() ), $default_settings );
	}

	/**
	 * Register all settings sections and fields
	 */
	static function register_settings() {

		// Add License Key Setting.
		add_settings_field(
			'themezee_blocks_settings[icon_block_license_key]',
			esc_html__( 'Icon Block', 'themezee-icon-block' ),
			array( __CLASS__, 'render_license_key_setting' ),
			'themezee_blocks_settings',
			'themezee_blocks_license_section'
		);
	}

	/**
	 * License Key Callback
	 */
	static function render_license_key_setting() {
		$options        = self::get_settings();
		$license_status = $options['icon_block_license_status'];
		$license_key    = ! empty( $options['icon_block_license_key'] ) ? $options['icon_block_license_key'] : false;

		$html = '';
		if ( 'valid' === $license_status && ! empty( $license_key ) ) {
			$html .= '<input type="text" class="regular-text" readonly="readonly" id="themezee_blocks_settings[icon_block_license_key]" name="themezee_blocks_settings[icon_block_license_key]" value="' . esc_attr( stripslashes( $license_key ) ) . '"/>';
			$html .= '<input type="submit" class="button" name="themezee_icon_block_deactivate_license" value="' . esc_attr__( 'Deactivate License', 'themezee-icon-block' ) . '"/>';
		} else {
			$html .= '<input type="text" class="regular-text" id="themezee_blocks_settings[icon_block_license_key]" name="themezee_blocks_settings[icon_block_license_key]" value="' . esc_attr( stripslashes( $license_key ) ) . '"/>';
			$html .= '<input type="submit" class="button" name="themezee_icon_block_activate_license" value="' . esc_attr__( 'Activate License', 'themezee-icon-block' ) . '"/>';
		}

		echo $html;
		wp_nonce_field( 'icon_block_license_nonce', 'icon_block_license_nonce' );
	}
}

// Run class.
ThemeZee_Icon_Block_License_Settings::setup();
