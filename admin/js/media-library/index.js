  "undefined" != typeof jQuery && function () {
    if ("undefined" != typeof wp && wp.media) {
      jQuery("body").click(function () {
        if (jQuery('#menu-item-resourcespace.active').length > 0) {
          jQuery('.media-frame-toolbar').hide();
        } else {
          jQuery('.media-frame-toolbar').show();
        }
        if (jQuery('#menu-item-browse.active').length > 0) {
          if (wp.media.frame.content.get('gallery')) {
            wp.media.frame.content.get('gallery').collection.props.set({
              '‌​ignore': (+new Date())
            });
          } else {
            //wp.media.frame.content.get().collection.props.set({'‌​ignore': (+ new Date())});
          }
        }
      });

      var coreBindbrowseRouter = wp.media.view.MediaFrame.Select.prototype.browseRouter;
      var coreBindHandlers = wp.media.view.MediaFrame.Select.prototype.bindHandlers;

      var mediaFrameSelect = wp.media.view.MediaFrame.Select,
        l10n = wp.media.view.l10n,
        t = wp.media.view.Frame,
        o = null;
      wp.media.view.Resourcespace_AttachmentsBrowser = t.extend({
          tagName: "div",
          className: "attachments-browser resourcespace-attachments-browser",
          objContainer: null,
          initialize: function () {
            _.defaults(this.options, {
              filters: !1,
              filteraccount: !1,
              search: !1,
              date: !1,
              display: !1,
              sidebar: !1,
              toolbar: !1,
              AttachmentView: wp.media.view.Attachment.Library
            })
            this.createHackyReactEmbedView()
          },
          createHackyReactEmbedView: function () {},
          photoUploadComplete: function (e, t) {},
          editSelection: function (e) {},
          dispose: function () {
            return this;
          },
          createToolbar: function () {},
          updateContent: function () {},
          createUploader: function () {},
          toggleUploader: function () {},
          createAttachments: function () {},
          createSidebar: function () {},
          createSingle: function () {},
          disposeSingle: function () {}
        }),

        mediaFrameSelect.prototype.bindHandlers = function () {
          coreBindHandlers.apply(this, arguments);
          this.on("router:create:browse", this.createRouter, this),
            this.on("router:render:browse", this.browseRouter, this),
            this.on("content:create:browse", this.browseContent, this),
            this.on("content:create:resourcespace", this.resourcespace, this)
          this.on("content:render:upload", this.uploadContent, this),
            this.on("toolbar:create:select", this.createSelectToolbar, this)
        },
        mediaFrameSelect.prototype.browseRouter = function (routerView) {
          this.objContainer = routerView;
          coreBindbrowseRouter.apply(this, arguments);
          var that = this;
          setTimeout(function () {
            var context = that.objContainer.controller.el.id;
            if (jQuery('#searchFrom', '#' + context) && jQuery('#menu-item-resourcespace', '#' + context).attr('aria-selected') == 'true') {
              jQuery('.media-frame-content', '#' + context).empty();
              jQuery('.media-frame-content', '#' + context).append('<div id="searchFrom" ></div>');
              if (jQuery('#menu-item-resourcespace', '#' + context).attr('aria-selected') == 'true') {
                window.displaySearchMediaLibraryFrom(false, 'mediaLibrary');
              }
            }
          }, 600)

          var t = {};
          t.upload = {
              text: l10n.uploadFilesTitle,
              priority: 20
            },
            t.browse = {
              text: l10n.mediaLibraryTitle,
              priority: 40
            },
            t.resourcespace = {
              text: "Resource Space",
              priority: 71
            }
          if (typeof routerView.set === 'function') {
            routerView.set(t)
          }
        },

        mediaFrameSelect.prototype.resourcespace = function (e) {
          var that = this;
          setTimeout(function () {
            var context = that.objContainer.controller.el.id;
            if (jQuery('#searchFrom', '#' + context) && jQuery('#menu-item-resourcespace', '#' + context).attr('aria-selected') == 'true') {
              jQuery('.media-frame-content', '#' + context).empty();
              jQuery('.media-frame-content', '#' + context).append('<div id="searchFrom" ></div>');
              if (jQuery('#menu-item-resourcespace', '#' + context).attr('aria-selected') == 'true') {
                window.displaySearchMediaLibraryFrom(false, 'mediaLibrary');
              }
            }
          }, 600)
        }
    }
  }(jQuery);