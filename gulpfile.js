"use strict";

var gulp = require('gulp');
var stylus = require("gulp-stylus");
var gls = require("gulp-live-server");
var testServer = require('karma').Server;
var mocha = require("gulp-mocha");
var bower = require("gulp-bower");
var html2js = require("gulp-ng-html2js");
var concat = require('gulp-concat-util');
var minifyHtml = require("gulp-minify-html");
var uglify = require("gulp-uglify");
var encrypt = require("gulp-openssl-encrypt");
var rename = require("gulp-rename");
var prompt = require("gulp-prompt");

var paths = {
  stylus: ['app/css/**/*.styl'],
  templates: ['app/components/**/*.html'],
  sensitive: ['server/config.json']
};

gulp.task('default', ['stylus','html2js']);

gulp.task('stylus', function(done) {
  gulp.src('app/css/app.styl')
    .pipe(stylus({
      //compress: true
    }))
    .pipe(gulp.dest('app/css/'))
    .on('end', done);
});

gulp.task('html2js',function(done){
    gulp.src(paths.templates)
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(html2js({
            moduleName: 'etgApp.templates',
            prefix: 'components/',
            declareModule: false,
            template: // change from template.prettyEscapedContent to template.escapedContent in Prodcution environment
                "$templateCache.put('<%= template.url %>',\n    '<%= template.escapedContent %>');\n"
        }))
        .pipe(concat("templates.js"))
        .pipe(concat.header(
            "define(['angular'],function(angular){'use strict';\n " +
            "return angular.module('etgApp.templates',[]).run(['$templateCache', function($templateCache) {\n"
        ))
        .pipe(concat.footer("\t}]);\n});"))
        .pipe(uglify())
        .pipe(gulp.dest("app/"))
        .on('end',done);
});


gulp.task("bower", function(){
    return bower()
        .pipe(gulp.dest("app/bower_components"));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.templates, ['html2js']);
  gulp.watch(paths.sensitive,['encrypt']);
});

gulp.task('serve',['watch'], function(){
    var server = gls('server/server.js',{env:{NODE_ENV: 'development', PORT:'8080'}});
    server.start();
    gulp.watch(['app/**/*.css','app/templates.js','app/**/*.js','!app/**/*.spec.js'], function(file){
        console.log("file change detected, reloading");
        server.notify.apply(server,[file]);
    });
    gulp.watch(['server/**/*.js','!server/**/*.spec.js'], function(){
        server.start.bind(server)();
    });
});





gulp.task("postinstall",["bower","decrypt"]);
