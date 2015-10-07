(function() {
    "use strict";

    var gulp = require("gulp");
    var args = require("yargs").argv;
    var git = require("gulp-git");

    var branches = {
        "development": "development",
        "release": "master"
    };

    var prefixes = {
        "releaseCandidate": "rc-"
    };

    var manifestPath = gulp.dest("./");
    var bowerManifest = "./bower.json";
    var nodeManifest = "./package.json";

    var onError = function(err) {
        if (err) throw err;
    };

    var updateVersion = function(changeType) {
        var bump = require("gulp-bump");

        return gulp.src([bowerManifest, nodeManifest])
            .pipe(bump({
                type: changeType
            }))
            .pipe(manifestPath);
    };

    var branch = function(branchName, switchAfterBranching) {
        if (switchAfterBranching) {
            git.checkout(branchName, {
                "args": "-b"
            }, onError);
        } else {
            git.branch(branchName);
        }
    };

    var getVersion = function() {
        var packageInfo = require('./package.json');
        return packageInfo.version;
    };

    gulp.task("version-minor", function() {
        updateVersion("minor");
    });
    gulp.task("version-major", function() {
        updateVersion("major");
    });
    gulp.task("version-patch", function() {
        updateVersion("patch");
    });

    gulp.task("new-feature", function() {
        git.checkout(branches.development, onError);
        git.pull("origin", branches.development);

        branch(args.name, true);
    });

    gulp.task("version-pre-release", function() {
        // Go to development branch.
        git.checkout(branches.development, onError);

        // Create a pre-release branch.
        branch(prefixes.releaseCandidate + getVersion(), true);

        // Update the version.
        updateVersion("prerelease");
    });
})();