"use strict";
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const stylelint = require("stylelint");

gulp.task("css", () => {
	const plugins = [
		cssnext(),
		stylelint()
	];
	gulp.src("src/style/**/*.css")
		.pipe(postcss(plugins))
		.pipe(gulp.dest("./dist/style"));
});

gulp.task("watch-css", ["css"], () => {
	gulp.watch("src/style/**/*.css", ["css"]);
});

gulp.task("default", ["css"]);
gulp.task("watch", ["watch-css"]);
