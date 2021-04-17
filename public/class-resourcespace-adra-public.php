<?php


/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://adrian.com
 * @since      1.0.0
 *
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/public
 * @author     Adrian <adrian@codecide.net>
 */
class Resourcespace_Adra_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Resourcespace_Adra_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Resourcespace_Adra_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/resourcespace-adra-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Resourcespace_Adra_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Resourcespace_Adra_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/resourcespace-adra-public.js', array( 'jquery' ), $this->version, false );

		//$plugin = Plugin::$instance;
		$wp_scripts = new \WP_Scripts();
		//$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG || defined( 'ELEMENTOR_TESTS' ) && ELEMENTOR_TESTS ) ? '' : '.min';
		wp_register_script(
			$this->plugin_name."_wp_search_form_medialibrary_tab",
			plugin_dir_url( __FILE__ ) .'../admin/js/media-library/index.js',
			[],
			$this->version.'-'.filemtime (dirname( __FILE__ ).'/../admin/js/media-library/index.js'),
			true
		);
		//wp_enqueue_script($this->plugin_name."_wp_search_form_medialibrary_tab");
		do_action( 'elementor/editor/before_enqueue_scripts' );
		//$document = Plugin::$instance->documents->get_doc_or_auto_save( $this->_post_id );

		// //search form Media Library
		// wp_enqueue_style( $this->plugin_name.'_wp_search_media_library_form_chunk', plugin_dir_url( __FILE__ ) . '../admin/js/search-media-libary/css/chunk-vendors.css', array(), $this->version.'-'.filemtime (dirname( __FILE__ ).'/../admin/js/search-media-libary/css/chunk-vendors.css'), 'all' );
		// wp_enqueue_style( $this->plugin_name.'_wp_search_media_library_form', plugin_dir_url( __FILE__ ) . '../admin/js/search-media-libary/css/app.css', array(), $this->version.'-'.filemtime (dirname( __FILE__ ).'/../admin/js/search-media-libary/css/app.css'), 'all' );
		// wp_enqueue_script( $this->plugin_name."_wp_search_form_media_library_protected_vendors", plugin_dir_url( __FILE__ ) . '../admin/js/search-media-libary/js/chunk-vendors.js', [], $this->version.'-'.filemtime (dirname( __FILE__ ).'/../admin/js/search-media-libary/js/chunk-vendors.js'), true);
		// wp_enqueue_script( $this->plugin_name."_wp_search_form_media_library_protected", plugin_dir_url( __FILE__ ) . '../admin/js/search-media-libary/js/app.js', [], $this->version.'-'.filemtime (dirname( __FILE__ ).'/../admin/js/search-media-libary/js/app.js'), true);

		// //media library tab
		// wp_enqueue_script( $this->plugin_name."_wp_search_form_medialibrary_tab", plugin_dir_url( __FILE__ ) . '../admin/js/media-library/index.js', [], $this->version.'-'.filemtime (dirname( __FILE__ ).'/../admin/js/media-library/index.js'), true);


	}
	
	public function register_shortcodes(){
		add_shortcode( 'resourcespace', array( $this, 'shortcode_resourcespace_img') );
		add_filter('widget_text', array( $this, 'shortcode_resourcespace_img'));
		add_filter( 'media_buttons', array( $this, 'shortcode_resourcespace_img'));

	}
	public function shortcode_resourcespace_img($atts){
		$opt_val = unserialize( get_option( RESOURCESPACE_OPTION ) );
		$opt_val = $opt_val['api_credentials'];
		$resourcespace = new resourcespace( $opt_val );
		$unprocessed_atts = "";
		$resource_id = isset($atts['id'])?$atts['id']:'';
		$size_id = isset($atts['size_id'])?$atts['size_id']:'';
		if( is_array($atts) ){
			foreach($atts as $key=>$value){
				if( $key!='id' && $key!='size_id' ){
					$unprocessed_atts .= " " . $key."='$value'";
				}
			}
		}
		$return = '';
		if( $resource_id != '' ){
			if($size_id!=''){
				$return = "<img src='".$resourcespace->get_resource_path($resource_id,$size_id)."' $unprocessed_atts>";
			}else{
				$original_file = $resourcespace->get_original_file($resource_id);
				$ext = pathinfo($original_file, PATHINFO_EXTENSION);
				$array_images = array('jpg','gif','png');
				$array_video = array('mp4');
				if( in_array($ext,$array_images) ){
					$return = "<img src='$original_file' $unprocessed_atts>";
				}elseif( in_array($ext,$array_video) ){
					$return = "
						<video class='video' $unprocessed_atts controls=''>
							<source src='$original_file' type='video/mp4'>
					 		Your browser does not support HTML5 video.
						</video>";
				}else{
					$return = "<a href='$original_file' target='_blank'  $unprocessed_atts>Download</a>";
				}
			}
		};
		return $return;
	}

}
