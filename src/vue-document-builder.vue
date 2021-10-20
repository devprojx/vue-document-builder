<template>
  <div id="gjs"></div>
</template>

<script>
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "./index.js";

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
  plugins: ["gjs-preset-document-creator"],
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
    this.editor = grapesjs.init({ ...this.options, container: "#gjs" });
    window.addEventListener("gjs-save-doc", (evt) => {
      this.$emit("save", evt.detail);
    });
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