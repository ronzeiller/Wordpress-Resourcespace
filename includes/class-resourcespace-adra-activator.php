<?php

/**
 * Fired during plugin activation
 *
 * @link       https://adrian.com
 * @since      1.0.0
 *
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/includes
 * @author     Adrian <adrian@codecide.net>
 */
class Resourcespace_Adra_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
        $roles = get_editable_roles();
        foreach ($GLOBALS['wp_roles']->role_objects as $key => $role) {
            if (isset($roles[$key]) ) {
                $role->add_cap( RESOURCESPACE_SEARCH_CAPACITY );
            }
        }
	}

}
