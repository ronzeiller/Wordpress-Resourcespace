<?php
define("RESOURCESPACE_OPTION", "resourcespace_options");

class resourcespace
{
    public $url;
    public $user;
    public $key;
    
    function __construct ( $opt_val )
    {

        $this->url = $opt_val['resourcespace_url'];
        $this->user = $opt_val['resourcespace_user'];
        $this->key = $opt_val['resourcespace_key'];
        
    }
    function execute_query($query_prop){
        $query="user=" . $this->user . "&function=".$query_prop['function'];
        for($idx=1;$idx<=7;$idx++){
            if(isset($query_prop['param'.$idx])){
                $query.='&param'.$idx.'='.urlencode($query_prop['param'.$idx]);
            }
        }
        $sign=hash("sha256",$this->key . $query);
        $content = file_get_contents($this->url."?" . $query . "&sign=" . $sign);
        if($content){
            $results = json_decode($content);
        }else{
            $results = $content;
        }
        return $results;
    }
    function search($search_term){
        $query_options = array(
            'function'=>'do_search',
            'param1'=>$search_term
        );
        return $this->execute_query($query_options);
    }
    function advanced_search($search_params){
        $query_options = array(
            'function'=>'do_search',
            'param1'=>$search_params['param1'],
        );
        if( isset($search_params['param2']) ){
            $query_options['param2'] = $search_params['param2'];
        }
        if( isset($search_params['param5']) ){
            $query_options['param5'] = $search_params['param5'];
        }
        if( isset($search_params['param7']) ){
            $query_options['param7'] = $search_params['param7'];
        }
        return $this->execute_query($query_options);
         
        //return ['params'=>$query_options,'results'=>$this->execute_query($query_options)];
    }
    function search_get_previews($search_params){
        $query_options = array(
            'function'=>'search_get_previews',
            'param1'=>$search_params['param1'],
        );
        if( isset($search_params['param2']) ){
            $query_options['param2'] = $search_params['param2'];
        }
        $query_options['param5']='10';
        $query_options['param8'] = 'thm';
        $query_options['param9']='jpg';
        return $this->execute_query($query_options);
    }

    function get_user_collections(){
        $query_options = array(
            'function'=>'get_user_collections',
        );
        return $this->execute_query($query_options);
    }
    function get_user_collections_options_array($include_all_option = false){
        $all_collections = [];
        $collections = $this->get_user_collections();
        $collections = array_reduce($collections, function ($result, $collection) {
            $result[$collection->ref] = $collection->name;
            return $result;
        }, array());
        return $collections;
    }

    function search_public_collections( $collection_name='' ){
        $query_options = array(
            'function'=>'search_public_collections',
            //'param1'=>$collection_name,
        );
        return $this->execute_query($query_options);
    }
    function get_resource_field_data($resource_id){
        $query_options = array(
            'function'=>'get_resource_field_data',
            'param1'=>$resource_id
        );
        return $this->execute_query($query_options);
    }
    function get_resource_path($resource_id,$type='',$extension=''){
        $query_options = array(
            'function'=>'get_resource_path',
            'param1'=> $resource_id,
            'param2' => 'false',
        );
        if($type!=''){
            $query_options['param3'] = $type;
        }
        if($extension!=''){
            $query_options['param5'] = $extension;
        }
        return $this->execute_query($query_options);
    }
    function get_related_resources($resource_id){
        $query_options = array(
            'function'=>'get_related_resources',
            'param1'=>$resource_id,
        );
        return $this->execute_query($query_options);
    }
    
    function get_field_options($field_id){
        $query_options = array(
            'function'=>'get_field_options',
            'param1'=>$field_id,
        );
        return $this->execute_query($query_options);
    }
    function get_resource_types(){
        $query_options = array(
            'function'=>'get_resource_types',
        );
        return $this->execute_query($query_options);
    }
    function get_resource_types_options_array(){
        $resource_types = $this->get_resource_types();
        $resource_types = array_reduce($resource_types, function ($result, $resource_type) {
            $result[$resource_type->ref] = $resource_type->name;
            return $result;
        }, array());
        return $resource_types;
    }

    function get_resource_data($ref_id){
        $query_options = array(
            'function'=>'get_resource_data',
            'param1'=>$ref_id,
        );
        return $this->execute_query($query_options);
    }
    function get_alternative_files($ref_id){
        $query_options = array(
            'function'=>'get_resource_data',
            'param1'=>$ref_id,
        );
        return $this->execute_query($query_options);
    }
    function get_original_file($ref_id){
        $resoruce_data = $this->get_resource_data( $ref_id );
        return $this->get_resource_path($ref_id,'',$resoruce_data->file_extension);
    }
    function get_images_sizes(){
        return array(
            "col" => "Collection	100x75",
            "thm" => "Thumbnail	150x150",
            "pre" => "Preview	900x480",
            
            // "scr" => "Screen	1400x800",	
            // "lpr" => "Low resolution print	2000x2000",	
            // "hpr" => "High resolution print",
        );
    }
    function  get_resource_all_image_sizes( $ref_id ){
        $query_options = array(
            'function'=>'get_resource_all_image_sizes',
            'param1'=>$ref_id,
        );
        return $this->execute_query($query_options);
    }

    


    function get_resourcespace_details( $ref ){
        $return_array = array(
            'fields'=>array(),
            'images'=>array(),
            'all_fields'=>array(),
        );
        $api_size_ids = false;
        $available_image_sizes = $this->get_resource_all_image_sizes($ref);
        if($available_image_sizes){
            $api_size_ids = array();
            foreach($available_image_sizes as $image_size){
                $api_size_ids[] = $image_size->size_code;
            }
        }
        $resoruce_data = $this->get_resource_data( $ref );
        $orig_file = $this->get_resource_path($ref,'',$resoruce_data->file_extension);
        $return_array['orig_file'] = $orig_file;
        foreach($this->get_resource_field_data( $ref ) as $obj_field){
            $return_array['all_fields'][$obj_field->name] = $obj_field->value;
            if(!empty($obj_field->value)){
                $return_array['fields'][$obj_field->title] = $obj_field->value;
            }
        }
        $images_description = $this->get_images_sizes($ref);
        foreach( $available_image_sizes as $image){
            if($image->size_code!='original'){
                $return_array['images'][$image->size_code] = array(
                    'url' => $image->url,
                    'name' => isset($images_description[$image->size_code]) ? $images_description[$image->size_code] : $image->size_code,
                );
            }
        }
        // foreach($this->get_images_sizes($ref) as $size_id=>$size_name){
        //     if(!$api_size_ids || in_array($size_id,$api_size_ids)){
        //         $return_array['images'][$size_id] = array(
        //             'url' => $this->get_resource_path($ref,$size_id),
        //             'name' => $size_name
        //         );
        //     }
        // }
        return $return_array;
    }

    function search_form_fields(){
        /*
            2 - select/checkboxes - animal - 
            9 - select - country
            3 - select - test field
            0 - input simplu - person - name/camera - title
            1 - textarea - input - notes
            3 - input - keywords - subject 
            4 - data
            5 - input extracted text 
        */
        $collections = $this->get_user_collections_options_array(true);
        if( !$collections ){
            return false;
        }
        $collections_obj = [ ['key'=>'all_values','value'=>'All Collections'] ];
        foreach($collections as $collection_id=>$collection_name){
            $collections_obj[] = ['key'=>$collection_id,'value'=>$collection_name];
        }

        $resource_types = $this->get_resource_types_options_array();
        $resource_types_obj = [ ['key'=>'all_values','value'=>'All Resources'] ];
        foreach($resource_types as $resource_id=>$resource_name){
            $resource_types_obj[] = ['key'=>$resource_id,'value'=>$resource_name];
        }
		$form_fields =[];
		$form_fields[]=[ 'name'=>'collection_id','label'=>'Collection','type'=>'select','options'=>$collections_obj,'default_value'=>'all_values','value'=>'','display_condition'=>''];
		$form_fields[]=[ 'name'=>'resource_id','label'=>'Resource Type','type'=>'select','options'=>$resource_types_obj,'default_value'=>'all_values','value'=>'','display_condition'=>''];

        
        $processed_fields = array();
        //foreach($resource_types as $resource_ref=>$resource_name){
      	$resource_ref = '-1';
            $fields = $this->get_resource_field_data($resource_ref);
            if($fields){
                foreach($fields as $field){
                    $field->display_template = '';
                    $field_type = 'text';
                    $options_array_obj=[];
                    if( !in_array($field->ref,$processed_fields) && in_array($field->type,[2,3]) ){
                        //getting filed options
                        $field_type = 'select';
                        $field_options = $this->get_field_options($field->ref);
                        if( sizeof($field_options)>1 ){
                            $field_type = 'select';
                            $options_array_obj = [['key'=> 'all_values','value'=>'All Values']];
                            foreach( $field_options as $field_option){
                                $options_array_obj[] = ['key'=> $field_option,'value'=>$field_option];
                            }
                        }
                    }
                
                    if( !in_array($field->ref,$processed_fields) ){
                        //insert input to form
                        if(  $field_type == 'select' ){
                            $form_fields[]=[ 'name'=>'metadata_field_'.$field->name,'label'=>$field->title,'type'=>'select','options'=>$options_array_obj,'linked_resources'=>[$resource_ref],'default_value'=>'all_values','value'=>'','display_condition'=>$field->display_condition];
                        }
                        if(  $field_type == 'text' ){
                            if($field->type!=4){
                                $form_fields[]=[ 'name'=>'metadata_field_'.$field->name,'label'=>$field->title,'type'=>'text','linked_resources'=>[$resource_ref],'default_value'=>'','value'=>'','display_condition'=>$field->display_condition];
                            }else{
                                $form_fields[]=[ 'name'=>'metadata_field_'.$field->name,'label'=>$field->title,'type'=>'date','linked_resources'=>[$resource_ref],'default_value'=>'','value'=>'','display_condition'=>$field->display_condition];
                            }
                        }
                        $processed_fields[] = $field->ref; 
                    }else{
                        //add field dependenciest by resource type
                        foreach ( $form_fields as &$form_field ){
                            if($form_field['name']=='metadata_field_'.$field->name ){
                                $form_field['linked_resources'][] = $resource_ref;
                                break;
                            }
                        }
                    }

                }
            }
        //}
        return $form_fields;
    }
    function create_search_array( $submited_values){
        $return = array('param1'=>'');
        $retrun['param5']= isset($submited_values['limit']) ? $submited_values['limit']:20;

        //search by resource type
        //if( isset($submited_values['resource_id']) && sizeof($submited_values['resource_id'])>0 ){
        if( isset($submited_values['resource_id']) && $submited_values['resource_id']!='all_values' ){
            
            $retrun['param2'] ='';
            foreach( $submited_values['resource_id'] as $resource_id => $checked){
                if($checked==='true'){
                    $retrun['param2'] .= ",$resource_id";
                }
            }
            if( $retrun['param2'] != '' ){
                $retrun['param2'] = substr($retrun['param2'],1);
            }

        }

        //searching by collections
        if( isset($submited_values['collection_id']) && $submited_values['collection_id']!='all_values' ){
            $retrun['param1'] = "!collection".$submited_values['collection_id'];
        }

        //searching by metadata fields
        if( isset($retrun['param1']) && $retrun['param1']!='' ){
            $retrun['param1'] .= " ";
        }
        foreach($submited_values as $field_name=>$field_value){
            if( !is_array( $field_value ) ){
                if( strpos($field_name,'metadata_field_')===0 && ($field_value!='' && $field_value!=-1 && $field_value!='all_values')){
                    $retrun['param1'] .= substr($field_name,15).":".$field_value." ";
                }
            }else{
                if( isset($field_value['type']) && $field_value['type']=='date' ){
                    //$retrun['param1'] .= substr($field_name,15).":".$field_value['value']."|23 ";
                    $first_day = $field_value['value']."-01";
                    $last_day =  date( 'Y-m-t', strtotime($first_day) );
                    //$date = date_create_from_format('Y|m|d', $first_day);
                    //$date->modify('last day of this month')
                    $retrun['param1'] .= substr($field_name,15).":rangestart".$first_day."end".$last_day." ";

                    //$retrun['param1'] .= substr($field_name,15).":rangestart2019-0-01end2019-09-30 ";    
                }
            }
        }
        if( !empty($submited_values['month_interval']) ){
            $retrun['param1'] .= "datefieldname:".$submited_values['month_interval']." ";
            $retrun['param1'] .= "datefieldname:rangestart2010-01-01end2019-09-07";
            //$retrun['param1'] = "datefieldname:2019|09|24 cat";
            //$retrun['param1'] = "datefieldname:rangestart2019-09-01end2019-09-25 cat";
        }
        if( isset($retrun['param1']) ){
            $retrun['param1'] = trim($retrun['param1']);
        }
        //adding search term
        if( isset($submited_values[ 'resourcespace_search' ]) ){
            if( !isset($retrun['param1']) ){
                $retrun['param1'] = '';
            }
            if($retrun['param1']!=''){
                $retrun['param1'] .= " ";
            }
            $retrun['param1'] .= $submited_values[ 'resourcespace_search' ];
        }
        //if( !empty($submited_values['offset']) ){
            $retrun['param7']=$submited_values['offset'];
        //}
        return $retrun;
    }

    
    
    
}
