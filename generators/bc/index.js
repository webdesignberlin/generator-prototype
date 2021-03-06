'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var pg = require('../../lib/pg-helpers');

module.exports = yeoman.generators.Base.extend({

// Custom prompts routine
	prompting: function () {
		var cb = this.async();

		console.log(
			('\n') + chalk.bgCyan('Generate your Backbone Collection') + ('\n')
		);

		var prompts = [
			{
				name: "srcPath",
				message: "Where do you have your source files?",
				default: "resources"
			},
			{
				name: 'path',
				message: 'Where would you like to place your Collection? root -> js/'
			},
			{
				name: 'initName',
				message: 'What do you want to name your Collection?',
				default: 'Data'
			}
		];

		this.prompt(prompts, function (props) {
			this.initName = props.initName;
			this.collection = props.collection;
			this.srcPath = pg.cleanupPath(props.srcPath);
			this.path = pg.cleanupPath(props.path);

			cb();
		}.bind(this));
	},

	/**
	 * Grunt modules file generation
	 *
	 */
	writing: {
		placeCollection: function () {
			this.template('_Collection.js.ejs', this.srcPath + 'js/' + this.path + this.initName + 'Collection.js');
		}
	}
});
