<?php
class A_Resorucespace_Widget extends WP_Widget {
  /**
  * To create the example widget all four methods will be 
  * nested inside this single instance of the WP_Widget class.
  **/
  public function __construct() {
    $widget_options = array( 
      'classname' => 'a_resorucespace_widget',
      'description' => 'Resourcespace Widget',
    );
    parent::__construct( 'example_widget', 'Resourcespace Widget', $widget_options );
  }
  
  public function widget( $args, $instance ) {
    $resource_id = apply_filters( 'rs_widget_id', $instance[ 'resource_id' ] );
    $resource_size = apply_filters( 'rs_widget_size', $instance[ 'resource_size' ] );
    echo $args['before_widget'];
    echo $this->shortcode_resourcespace_img($resource_id,$resource_size);
    echo $args['after_widget'];
  }
  public function insertJsScrips(){
    $base_url = plugin_dir_url( __FILE__ );
    $base_url = str_replace('includes/','',$base_url);
?>
    <link rel='stylesheet' id='resourcespace-adra_wp_search_form_chunk-css'  href='<?php echo $base_url; ?>admin/js/search-form/css/chunk-vendors.css?ver=1.0.0-<?php echo( filemtime(dirname( __FILE__ ).'/../admin/js/search-form/css/chunk-vendors.css' ) ); ?>' media='all' />
    <link rel='stylesheet' id='resourcespace-adra_wp_search_form-css'  href='<?php echo $base_url; ?>admin/js/search-form/css/app.css?ver=1.0.0-<?php echo( filemtime(dirname( __FILE__ ).'/../admin/js/search-form/css/app.css' ) ); ?>' media='all' />
    <script src='/wp-includes/js/dist/vendor/moment.min.js?ver=2.22.2'></script>
    <script src='<?php echo $base_url; ?>admin/js/search-form/js/chunk-vendors.js?ver=1.0.0-<?php echo( filemtime(dirname( __FILE__ ).'/../admin/js/search-form/js/chunk-vendors.js' ) ); ?>'></script>
    <script src='<?php echo $base_url; ?>/admin/js/search-form/js/app.js?ver=1.0.0-<?php echo( filemtime(dirname( __FILE__ ).'/../admin/js/search-form/js/app.js' ) ); ?>'></script>
<?php
  }

  public function form( $instance ) {
    if(strpos($_SERVER['HTTP_REFERER'],'action=elementor') ){
        $this->insertJsScrips();
    }
    $resource_id = ! empty( $instance['resource_id'] ) ? $instance['resource_id'] : ''; 
    $resource_size = ! empty( $instance['resource_size'] ) ? $instance['resource_size'] : '';
    $time_stamp = ! empty( $instance['time_stamp'] ) ? $instance['time_stamp'] : round(microtime(true)*1000 ); 
?>
    <script>
        
            function searchResourcespace<?=$time_stamp?>(){
                jQuery(function($) {
                    if( $("#searchFrom").length==0 ){
                      $("#searchFrom-wrapper-<?php echo $time_stamp;?>").append(`<div id="searchFrom"></div>`);
                    }else{
                        delete window.vueApp;
                        $("#searchFrom").remove();
                        $("#searchFrom-wrapper-<?php echo $time_stamp;?>").append(`<div id="searchFrom"></div>`);
                    }
                    window.vueApp = window.displaySearchFrom( true,'widgetInsert-'+ '<?php echo $time_stamp;?>');
                    //return false;
                });
            }
        
    </script>
    <div id="searchFrom-wrapper-<?php echo $time_stamp;?>"></div>
    <input 
        type="hidden" 
        id='<?php echo esc_attr( $this->get_field_id( 'time_stamp' ) ); ?>' 
        name='<?php echo esc_attr( $this->get_field_name( 'time_stamp' ) ); ?>' 
        value='<?php echo $time_stamp; ?>'>
    <p class="resourcespace-container">
      <!-- <a onclick='javascript: searchResourcespace();' >Search Resourcespace</a><br> -->
      <button type='button' onclick="searchResourcespace<?=$time_stamp?>();">Search Resourcespace</button><br>
      <label for="<?php echo esc_attr( $this->get_field_id( 'resource_id' ) ); ?>">Resource ID:</label>
      <input 
		class="resource-id-<?php echo $time_stamp;?>" 
		id="<?php echo esc_attr( $this->get_field_id( 'resource_id' ) ); ?>" 
		name="<?php echo esc_attr( $this->get_field_name( 'resource_id' ) ); ?>" 
		type="text" 
		value="<?php echo esc_attr( $resource_id ); ?>">
	</p>
      
      <label for="<?php echo esc_attr( $this->get_field_id( 'resource_size' ) ); ?>">Resource Size(empty for orig size):</label>
      <input 
		class="resource-size-<?php echo $time_stamp;?>" 
		id="<?php echo esc_attr( $this->get_field_id( 'resource_size' ) ); ?>" 
		name="<?php echo esc_attr( $this->get_field_name( 'resource_size' ) ); ?>" 
		type="text" 
		value="<?php echo esc_attr( $resource_size ); ?>">
    </p>
<?php 
  }

    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance[ 'time_stamp' ] = strip_tags( $new_instance[ 'time_stamp' ] );
        $instance[ 'resource_id' ] = strip_tags( $new_instance[ 'resource_id' ] );
        $instance[ 'resource_size' ] = strip_tags( $new_instance[ 'resource_size' ] );
        return $instance;
    }

	public function shortcode_resourcespace_img($resource_id,$size_id){
		$opt_val = unserialize( get_option( RESOURCESPACE_OPTION ) );
		$opt_val = $opt_val['api_credentials'];
		$resourcespace = new resourcespace( $opt_val );
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

add_action( 'widgets_init', 'register_a_resourcespace_widget' );
function register_a_resourcespace_widget() { 
    register_widget( 'A_Resorucespace_Widget' );
  }
