(function () {
	tinymce.PluginManager.add('resourcespace_mce', function (editor) {
		editor.addButton('resourcespace_mce_button', {
			text: 'Resourcespace',
			icon: false,
			onclick: function () {
				wp.mce.boutique_banner.popupwindow(editor);
			}
		});
	});
})();