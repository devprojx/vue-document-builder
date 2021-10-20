import grapesjs from "grapesjs";
import pluginNewsletter from "grapesjs-preset-newsletter";
import pluginPageBreak from "grapesjs-page-break";
import pluginRTE from "grapesjs-rte-extensions";
import pluginBlockSearch from "./plugins/gjs-block-search.js";

import commands from "./commands";
import panels from "./panels";

export default grapesjs.plugins.add("gjs-preset-document-creator", (editor, opts = {}) => {
	let config = opts;

	//load plugins
	pluginNewsletter(editor, {
		categoryLabel: "Basic",
	});
	pluginPageBreak(editor, { category: "Basic" });
	pluginRTE(editor, {
		base: {
			bold: true,
			italic: true,
			underline: true,
			strikethrough: true,
			link: true,
		},
		fonts: {
			fontSize: true,
			fontColor: true,
			hilite: true,
		},
		format: {
			heading1: true,
			heading2: true,
			heading3: true,
			paragraph: true,
			clearFormatting: true,
		},
		subscriptSuperscript: true,
		indentOutdent: false,
		list: true,
		align: true,
		actions: false,
		undoredo: false,
		extra: false,
		darkColorPicker: true,
		maxWidth: "600px",
	});

	panels(editor, config);
	pluginBlockSearch(editor);
	commands(editor, config);

	setTimeout(() => {
		const iframe = document.getElementsByTagName("iframe")[0];
		const el = iframe.contentWindow.document.getElementsByTagName("body")[0];
		el.style.cssText = "font-family: 'Roboto', sans-serif; font-size: 14px; margin-top: 1.5cm; margin-left: 1.5cm; margin-right: 1.5cm; margin-bottom: 1.5cm";
	}, 500);
});
