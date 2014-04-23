var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var component = require('gulp-component');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var nib = require('nib');
process.on("uncaughtException",function(err){
    console.log(err,err.stack);
});

gulp.task('connect',function(){
    connect.server({
        port: 1234,
        livereload: true
    });
});


gulp.task('stylus', function(){
    var stylusOptions = {
        use: [nib()],
        import : ["nib","variables","mixins"]
    };
    gulp.src(["./css/*.styl"])
        .pipe(changed('./css/', { extension: '.css' }))
        .pipe(stylus())
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

gulp.task('jade', function(){
    var source = gulp.src(["./jade/*.jade","!./jade/*layout.jade"])
        .pipe(changed('./html/', { extension: '.html' }))
        .pipe(jade())
        .pipe(gulp.dest("html/"))
        .pipe(connect.reload());

    function change_name(source,name){
        source.pipe(rename({
            basename: name
        }))
        .pipe(gulp.dest("html/"))
    }
});


gulp.task('watch', function () {
  gulp.watch(["./jade/**/*.jade"], ['jade']);
  gulp.watch(["./css/*.styl"], ['stylus']);
});

gulp.task('default', ['stylus','jade','watch','connect']);
