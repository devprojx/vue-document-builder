export default (editor) => {
	const searchInput = document.createElement("input");
	searchInput.name = "block-search";
	searchInput.type = "search";
	searchInput.placeholder = "Search";
	searchInput.classList.add(["gjs-search"]);
	searchInput.onkeyup = (e) => {
		const blockManager = editor.BlockManager;
		const blocks = blockManager.getAll();
		blockManager.render(
			blocks.filter((block) => {
				return block.id.indexOf(e.target.value) > -1;
			})
		);
	};

	setTimeout(() => {
		const panelNode = editor.Panels.getPanelsEl().querySelectorAll(".gjs-pn-panels > .gjs-pn-views-container")[0];
		panelNode.prepend(searchInput);
	}, 1000);
};
