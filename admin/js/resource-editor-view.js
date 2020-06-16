/* global tinyMCE */
(function ($) {
	var shortcode_string = 'resourcespace';
	wp.mce = wp.mce || {};
	wp.mce.resourcespace = {
		shortcode_data: {},
		getContent: function () {
			var options = this.shortcode.attrs.named;
			//options.innercontent = this.shortcode.content;
			renderedShortCode = '';
			$.ajax({
				url: "/wp-admin/admin-ajax.php?action=resourcespace_get_rendered_shortcode",
				async: false,
				data: this.shortcode.attrs.named,
				success: function (result) {
					renderedShortCode = JSON.parse(result).html;
				}
			})
			return renderedShortCode;
		},
		edit: function (data) {
			var shortcode_data = wp.shortcode.next(shortcode_string, data);
			var values = shortcode_data.shortcode.attrs.named;
			//values.innercontent = shortcode_data.shortcode.content;
			//values.style='';
			//values.class='default';
			wp.mce.resourcespace.popupwindow(tinyMCE.activeEditor, values);
		},
		// this is called from our tinymce plugin, also can call from our "edit" function above
		// wp.mce.resourcespace.popupwindow(tinyMCE.activeEditor, "bird");
		popupwindow: function (editor, values, onsubmit_callback) {
			values = values || [];
			if (typeof onsubmit_callback !== 'function') {
				onsubmit_callback = function (e) {
					var args = {
						tag: shortcode_string,
						type: 'single',
						content: '',
						attrs: {
							id: e.data.resourceID,
							size_id: e.data.sizeID,
							style: e.data.style,
							class: e.data.cssClass,
						}
					};
					editor.insertContent(wp.shortcode.string(args));
				};
			}
			editor.windowManager.open({
				title: 'Resourcespace CSS Editor',
				body: [{
						type: 'textbox',
						name: 'resourceID',
						label: 'Resource ID',
						value: values.id,
						readonly: true,
					},
					{
						type: 'textbox',
						name: 'sizeID',
						label: 'Size ID',
						value: values.size_id
					},

					{
						type: 'textbox',
						multiline: true,
						name: 'style',
						label: 'Style',
						value: values.style
					},
					{
						type: 'textbox',
						name: 'cssClass',
						label: 'CSS Class',
						value: values.class
					},
				],
				onsubmit: onsubmit_callback
			});
		}
	};
	wp.mce.views.register(shortcode_string, wp.mce.resourcespace);
}(jQuery));