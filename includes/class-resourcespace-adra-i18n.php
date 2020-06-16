<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://adrian.com
 * @since      1.0.0
 *
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/includes
 * @author     Adrian <adrian@codecide.net>
 */
class Resourcespace_Adra_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'resourcespace-adra',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
