<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://codecide.net
 * @since             1.0.0
 * @package           Resourcespace
 *
 * @wordpress-plugin
 * Plugin Name:       ResourceSpace
 * Plugin URI:        https://codecide.net
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.8
 * Author:            Adrian
 * Author URI:        https://codecide.net
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       resourcespace
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}
include 'includes/resourcespace-api.php';
include_once  "includes/class-resourcespace-elementor.php";


 // // repository config data
/*

*/
/**
 * Currently plugin version.
 * Start at version 1.0.5 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'ADRA_VERSION', '1.0.6' );
define( 'RESOURCESPACE_SEARCH_CAPACITY', 'SEARCH_CAPACITY' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-resourcespace-adra-activator.php
 */
function activate_resourcespace_adra() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-resourcespace-adra-activator.php';
	Resourcespace_Adra_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-resourcespace-adra-deactivator.php
 */
function deactivate_resourcespace_adra() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-resourcespace-adra-deactivator.php';
	Resourcespace_Adra_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_resourcespace_adra' );
register_deactivation_hook( __FILE__, 'deactivate_resourcespace_adra' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-resourcespace-adra.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.5
 */

function run_resourcespace_adra() {
    $plugin = new Resourcespace_Adra();
    $plugin->run();
}
run_resourcespace_adra();
