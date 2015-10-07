(function() {
    "use strict";

    var gulp = require("gulp");
    var manifestPath = gulp.dest("./");
    var args = process.argv

    var options = {
        isMajor: args.indexOf("--major") !== -1,
        isMinor: args.indexOf("--minor") !== -1,
        isPreRelease: args.indexOf("--pre-release") !== -1
    };

    gulp.task("increment-version", function() {
        var bump = require('gulp-bump');

        var bowerManifest = "./bower.json";
        var nodeManifest = "./package.json";

        var type = (options.isMinor) ? "minor" :
            (options.isMajor) ? "major" :
            (options.isPreRelease) ? "prerelease" : "patch"

        gulp.src([bowerManifest, nodeManifest])
            .pipe(bump({
                type: type
            }))
            .pipe(manifestPath);
    });
})();