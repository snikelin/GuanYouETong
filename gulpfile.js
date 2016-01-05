"use strict";

var gulp = require('gulp');
var stylus = require("gulp-stylus");
//var rename = require("gulp-rename");
//var bower = require("gulp-bower");

var paths = {
  stylus: ['app/css/**/*.styl'],
  templates: ['app/components/**/*.html'],
  sensitive: ['server/config.json']
};

gulp.task('default', ['stylus','html2js']);

gulp.task('stylus', function(done) {
  gulp.src('server/templates/JG47.styl')
    .pipe(stylus({
       url: {name:'url', limit: false}
    }))
    .pipe(gulp.dest('server/templates/'))
    .on('end', done);
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
