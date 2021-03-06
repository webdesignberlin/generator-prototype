/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var fs = require('fs');

describe('bower', function () {
	var srcPath = "resources/";

	describe('when no frameworks are selected', function () {
		var answers = require('../test_helpers/prompt-answer-factory')({});

		beforeEach(function (done) {
			helpers.run(path.join(__dirname, '../generators/app'))
				.inDir(path.join(__dirname, 'tmp'))
				.withOptions({
					'skip-install': true,
					'skip-welcome-message': true
				})
				.withPrompts(answers)
				.on('end', done);
		});

		it('deletes all bower dependenies', function () {
			assert.noFileContent('bower.json', /pg-components|pg-scss|pg-js|almond|requirejs|requirejs-text|backbone|jquery|foundation|sass-bootstrap|bourbon|neat/);
		});

	});

});