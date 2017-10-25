

// gulp code for  Linting the js file 


var gulp = require('gulp')
, jshint = require("gulp-jshint");
gulp.task('jsLint', function () {
//gulp.src('server.js')
    gulp.src('/*.js') // path to your files
    .pipe(jshint())
    .pipe(jshint.reporter()); // Dump results
});





//gulp code for minigying the js file


var gulp=require('gulp');
var uglify = require('gulp-uglify-es').default;

gulp.task("uglify", function () {
   return gulp.src("server.js")  // minifying server.js file from the project
       .pipe(uglify(/* options */))
       .pipe(gulp.dest("destination"));   // minified code saved to destination folder.
});
