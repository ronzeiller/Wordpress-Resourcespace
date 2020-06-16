# Project Title

This plugin allow users of the WordPress CMS to integrate resources which are stored in a ResourceSpace repository in their content. Resources can be embedded directly from the ResourceSpace server, or synchronized and replicated in the local WordPress media library. 

## Getting Started

Clone the project to a folder within the wp-content/plugins directory of your local WordPress development instance.

### Prerequisites

Update the dependencies and build the souce using npm. 

```
cd block-editor
sudo npm update
sudo npm update --depth 5 @babel/compat-data
```

To compile new source code:

```
npm run build 
```

Repeat the above in each of the following directories:

* block-editor
* admin/js/src/admin-form
* admin/js/src/search-form
* admin/js/src/search-media-library

### Installing

To create a distributable version of the plugin, use a copy of the project folder _without_ the following directories:

* block-editor/src
* admin/js/src/
* node_modules

Upload the files to the plugins directory of the target WordPress instance, or zip the files for easy distribution. 

## Configuration and Usage

1. From the WordPress administration panel, visit the ResourceSpace Options screen. 
1. Under the API Details section, enter the user credentials. The ResourceSpace Key can be retrieved by visiting the host ResourceSpace instance and going to: _Admin > Manage users > {username}/Private API Key/{instance}/API_ 
1. Save the changes (button at the bottom) to connect to the repository and complete the customization step.
1. Under the Role Access section, enable the user roles that will be able to access the remote resources. 
1. Under the Media Library Fields Map section, use the drop-down selections (right column) to map the Media library fields. This will be used to fill the standard WordPress Media Library fields when importing a resource from the ResourceSpace repository.
1. Under the Search Form Setup section, add to the common search fields (left column) by dragging from the list of available custom fields on your ResourceSpace instance (right column).
1. Save the changes again.

User can add resources to their pages, posts or other custom content using shortcodes generated from the ResourceSpace panel within the admin section, or from the block or classic editor options. A ResourceSpace tab in the Media Library allow users to copy resources to the local server or to embed a resource using a generated shortcode.

The shortcodes support CSS properties as arguments, if and when those need to be updated manually. 

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
