var gulp        = require('gulp');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var watch = require('gulp-watch');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
// Gulp as asset manager for jekyll. Please note that the assets folder is never cleaned
//so you might want to manually delete the _site/assets folder once in a while.
// this is because gulp will move files from the assets directory to _site/assets,
// but it will not remove them from _site/assets if you remove them from assets.

/**
 * Build the Jekyll Site.
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    process.env.DISABLE_GITHUB_PULL = "true";
    return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--incremental'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload when watched files change
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */

gulp.task('serve', ['jekyll-build'], function() {
    browserSync.init({
        server: "_site/"
    });
});

/**
 * Watch jekyll source files for changes, don't watch assets
 */
gulp.task('watch', function () {
    gulp.watch(['**/*.*','../ccm_jekyll_theme/**/*', '!_site/**/*','!_assets/**/*','!node_modules/**/*','!.sass-cache/**/*' ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will 
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['serve', 'watch']);

