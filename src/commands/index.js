export default (editor) => {
	const viewPanel = [...editor.Panels.getPanel("views").btn];

	const styleBtn = viewPanel.find((el) => el.id === "open-sm");
	styleBtn.active = false;

	const blocksBtn = viewPanel.find((el) => el.id === "open-blocks");
	blocksBtn.active = true;

	editor.Panels.addButton("options", {
		id: "save",
		className: "fa fa-floppy-o",
		command: async function(editor) {
			const htmlcss = editor.runCommand("gjs-get-inlined-html");
			const evt = new CustomEvent("gjs-save-doc", { detail: htmlcss });
			window.dispatchEvent(evt);
		},
		attributes: { title: "Save" },
	});
};
