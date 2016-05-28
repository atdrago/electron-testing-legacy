'use strict';

var grunt   = require('grunt');
var fs      = require('fs');
var config  = JSON.parse(fs.readFileSync('package.json'));
var version = config['version'];

require('load-grunt-tasks')(grunt);

grunt.initConfig({
	electron: {
		osxBuild: {
			options: {
				name: 'Electron Testing',
				arch: 'x64',
				version: '0.37.8',
				platform: 'darwin',
				out: 'dist',
				dir: './',
				overwrite: true,
				asar: true,
				'app-bundle-id': 'com.adamdrago.electron-testing',
				'helper-bundle-id': 'com.adamdrago.electron-testing.helper',
				'app-version': version,
				prune: true
			}
		}
	}
});

grunt.registerTask('default', ['electron']);
