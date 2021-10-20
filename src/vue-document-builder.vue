<template>
  <div id="gjs"></div>
</template>

<script>
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import pluginNewsletter from "grapesjs-preset-newsletter";
import pluginPageBreak from "grapesjs-page-break";
import pluginRTE from "grapesjs-rte-extensions";

const DEFAULT_OPTIONS = {
  width: "auto",
  height: "100%",
  fontFamily: "'Roboto', sans-serif",
  fontSize: "14px",
  margin: {
    top: "1.5cm",
    right: "1.5cm",
    bottom: "1.5cm",
    left: "1.5cm",
  },
  showOffsets: 1,
  fromElement: true,
  storageManager: false,
  deviceManager: {
    default: "tablet",
    devices: [
      {
        id: "tablet",
        name: "Tablet",
        width: "992px",
        widthMedia: "992px",
      },
    ],
  },
  plugins: ["gjs-document-creator-preset"],
};

export default {
  name: "VueDocumentBuilder",
  props: {
    options: {
      type: Object,
      default: () => DEFAULT_OPTIONS,
    },

    blocks: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    blocks: function (values) {
      values.forEach((el) => this.editor.BlockManager.add(el.id, { ...el }));
    },
  },

  data: () => ({
    editor: null,
  }),

  mounted() {
    //Set default options
    for (const key in DEFAULT_OPTIONS) {
      if (
        key == "plugins" &&
        this.options[key] &&
        Array.isArray(this.options[key])
      ) {
        this.options[key] = DEFAULT_OPTIONS[key].concat(this.options[key]);
      }
      if (!this.options[key]) this.options[key] = DEFAULT_OPTIONS[key];
    }

    //Initialize editor
    grapesjs.plugins.add(
      "gjs-document-creator-preset",
      this.documentCreatorPresetPlugin
    );
    this.editor = grapesjs.init({ ...this.options, container: "#gjs" });
    window.addEventListener("gjs-save-doc", (evt) => {
      this.$emit("save", evt.detail);
    });
  },
  methods: {
    documentCreatorPresetPlugin(editor, opts = {}) {
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

      this.initPanels(editor, config);
      this.searchPlugin(editor);
      this.initCommands(editor, config);

      setTimeout(() => {
        const iframe = document.getElementsByTagName("iframe")[0];
        const el =
          iframe.contentWindow.document.getElementsByTagName("body")[0];
        el.style.cssText =
          "font-family: 'Roboto', sans-serif; font-size: 14px; margin-top: 1.5cm; margin-left: 1.5cm; margin-right: 1.5cm; margin-bottom: 1.5cm";
      }, 500);
    },

    searchPlugin(editor) {
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
        const panelNode = editor.Panels.getPanelsEl().querySelectorAll(
          ".gjs-pn-panels > .gjs-pn-views-container"
        )[0];
        panelNode.prepend(searchInput);
      }, 1000);
    },
    initCommands(editor) {
      const viewPanel = [...editor.Panels.getPanel("views").btn];

      const styleBtn = viewPanel.find((el) => el.id === "open-sm");
      styleBtn.active = false;

      const blocksBtn = viewPanel.find((el) => el.id === "open-blocks");
      blocksBtn.active = true;

      editor.Panels.addButton("options", {
        id: "save",
        className: "fa fa-floppy-o",
        command: async function (editor) {
          const htmlcss = editor.runCommand("gjs-get-inlined-html");
          const evt = new CustomEvent("gjs-save-doc", { detail: htmlcss });
          window.dispatchEvent(evt);
        },
        attributes: { title: "Save" },
      });
    },

    initPanels(editor, config) {
      const pn = editor.Panels;
      const eConfig = editor.getConfig();
      const swv = "sw-visibility";
      const expt = "export-template";
      const osm = "open-sm";
      const otm = "open-tm";
      const ola = "open-layers";
      const obl = "open-blocks";
      const ful = "fullscreen";
      const prv = "preview";

      eConfig.showDevices = 0;

      pn.getPanels().reset([
        {
          id: "commands",
          buttons: [{}],
        },
        {
          id: "options",
          buttons: [
            {
              id: swv,
              command: swv,
              context: swv,
              className: "fa fa-square-o",
            },
            {
              id: prv,
              context: prv,
              command: (e) => e.runCommand(prv),
              className: "fa fa-eye",
            },
            {
              id: ful,
              command: ful,
              context: ful,
              className: "fa fa-arrows-alt",
            },
            {
              id: expt,
              className: "fa fa-code",
              command: (e) => e.runCommand(expt),
            },
            {
              id: "undo",
              className: "fa fa-undo",
              command: (e) => e.runCommand("core:undo"),
            },
            {
              id: "redo",
              className: "fa fa-repeat",
              command: (e) => e.runCommand("core:redo"),
            },
          ],
        },
        {
          id: "views",
          buttons: [
            {
              id: obl,
              command: obl,
              className: "fa fa-th-large",
              active: true,
            },
            {
              id: osm,
              command: osm,
              className: "fa fa-paint-brush",
            },
            {
              id: otm,
              command: otm,
              className: "fa fa-cog",
            },
            {
              id: ola,
              command: ola,
              className: "fa fa-bars",
            },
          ],
        },
      ]);

      // Add devices buttons
      const panelDevices = pn.addPanel({ id: "devices-c" });
      panelDevices.get("buttons").add([
        {
          id: "set-device-tablet",
          command: "set-device-tablet",
          className: "fa fa-tablet",
        },
      ]);

      const openBl = pn.getButton("views", obl);
      editor.on("load", () => openBl && openBl.set("active", 1));

      // On component change show the Style Manager
      config.showStylesOnChange &&
        editor.on("component:selected", () => {
          const openSmBtn = pn.getButton("views", osm);
          const openLayersBtn = pn.getButton("views", ola);

          // Don't switch when the Layer Manager is on or
          // there is no selected component
          if (
            (!openLayersBtn || !openLayersBtn.get("active")) &&
            editor.getSelected()
          ) {
            openSmBtn && openSmBtn.set("active", 1);
          }
        });
    },
  },
};
</script>

<style>
.gjs-search {
  border: 2px solid #9ca8bb;
  border-radius: 0px;
  height: 20px;
  width: 100%;
  padding: 16px 5px 16px 10px;
  outline: 0;
  color: #fff;
  background-color: transparent;
}

.gjs-search::placeholder {
  color: #9ca8bb;
  opacity: 1;
}

/* Theming */
.gjs-one-bg {
  background-color: #242a3b;
}

.gjs-two-color {
  color: #9ca8bb;
}

.gjs-three-bg {
  background-color: #1e8fe1 !important;
  color: white;
}

.gjs-four-color,
.gjs-four-color-h:hover {
  color: #1e8fe1 !important;
}
</style>