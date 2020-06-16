<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://adrian.com
 * @since      1.0.0
 *
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/includes
 * @author     Adrian <adrian@codecide.net>
 */
class Resourcespace_Adra_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
        $roles = get_editable_roles();
        foreach ($GLOBALS['wp_roles']->role_objects as $key => $role) {
            if (isset($roles[$key]) && $role->has_cap( RESOURCESPACE_SEARCH_CAPACITY )) {
                $role->remove_cap( RESOURCESPACE_SEARCH_CAPACITY );
            }
        }
	}

}
