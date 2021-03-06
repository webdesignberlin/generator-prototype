'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
// Custom prompts routine
	prompting: function () {
		var cb = this.async();

		console.log(
			('\n') + chalk.bgMagenta('Install Assemble Helpers') + ('\n')
		);

		var prompts = [{
			name: "helperPath",
			message: "Where do you have your source files?",
			default: "resources"
		}, {
			name: "assembleHelperFiles",
			type: "checkbox",
			message: "Which Assemble Helpers do you want to install?",
			choices: [
				{
					name: "Times (Block Helper) - Repeat your html elements",
					value: "helperTimes"
				},
				{
					name: "Limit (Block Helper) - Limit your JSON output",
					value: "helperLimit"
				},
				{
					name: "Advanced Partial Helper - Use multiple contexts in your partials.",
					value: "helperPartial"
				},
				{
					name: "If (Block Helper) - Execute an IF statement with any expression.",
					value: "helperIf"
				},
				{
					name: "IfBlock (Block Helper) - Determine if {{#block}} is set for extended layouts.",
					value: "helperIfBlock"
				},
				{
					name: "Autolink (Simple Helper) - Generate relative links.",
					value: "helperAutolink"
				},
				{
					name: "Panel (Block Helper) - Enclose snippets/partials with a predefined markup.",
					value: "helperPanel"
				},
				{
					name: "Random Helper - Returns a random number.",
					value: "helperRandom"
				}
			]
		}];

		this.prompt(prompts, function (props) {
			this.assembleHelperFiles = props.assembleHelperFiles;
			this.path = props.helperPath;
			if (this.path !== '') {
				this.path = this.path.replace(/\/?$/, '/');
			}
			//save config to .yo-rc.json
			this.config.set(props);
			cb();
		}.bind(this));

	},

	/**
	 * Grunt modules file generation
	 *
	 */
	writing: {
		assemble: function () {
			var root = '../../app/templates/resources/templates/helpers/';
			var assemble = '../../app/templates/resources/templates/';

// Grunt modules are splitted up in separate files and modules
			if (this.assembleHelperFiles && this.assembleHelperFiles.length > 0) {
				if (this.assembleHelperFiles.indexOf('helperTimes') != -1) {
					this.copy(root + "helper-for.js", this.path + "/templates/helpers/helper-for.js");
				}
				if (this.assembleHelperFiles.indexOf('helperLimit') != -1) {
					this.copy(root + 'helper-limit.js', this.path + 'templates/helpers/helper-limit.js');
				}
				if (this.assembleHelperFiles.indexOf('helperPartial') != -1) {
					this.copy(root + 'helper-partial.js', this.path + 'templates/helpers/helper-partial.js');
					this.npmInstall(['lodash'], {'saveDev': true});
					this.npmInstall(['gray-matter'], {'saveDev': true});
				}
				if (this.assembleHelperFiles.indexOf('helperIf') != -1) {
					this.copy(root + 'helper-xif.js', this.path + 'templates/helpers/helper-xif.js');
				}
				if (this.assembleHelperFiles.indexOf('helperIfBlock') != -1) {
					this.copy(root + 'helper-ifBlock.js', this.path + 'templates/helpers/helper-ifBlock.js');
				}
				if (this.assembleHelperFiles.indexOf('helperAutolink') != -1) {
					this.npmInstall(['handlebars-helper-autolink'], {'saveDev': true});
					console.log(
						('\n') +
						chalk.bgRed(' Autolink Helper - Please add the following lines to your package.json)') + ('\n') +
						chalk.yellow('\n "keywords": [') +
						chalk.yellow('\n    "handlebars-helper-autolink"') +
						chalk.yellow('\n ]') + ('\n') + ('\n')
					);
				}
				if (this.assembleHelperFiles.indexOf('helperPanel') != -1) {
					this.copy(root + 'helper-panel.js', this.path + 'templates/helpers/helper-panel.js');
					this.copy(assemble + 'partials/panels/README.md', this.path + 'templates/panels/README.md');
					console.log(
						('\n') +
						chalk.bgRed('Panel Helper - For further instructions see: http://www.prototype-generator.com/templating-in-pg/template-helpers.html)') +
						chalk.yellow('\n') + ('\n') + ('\n')
					);
				}
				if (this.assembleHelperFiles.indexOf('helperRandom') != -1) {
					this.copy(root + 'helper-random.js', this.path + 'templates/helpers/helper-random.js');
				}
			}
		}
	}
});