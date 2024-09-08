module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" }, comments: "true" }],
		"@babel/preset-typescript",
		["@babel/preset-react", { runtime: "automatic" }],
	],
};
