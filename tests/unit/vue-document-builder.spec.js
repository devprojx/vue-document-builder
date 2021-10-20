import { shallowMount } from "@vue/test-utils";
import VueDocumentBuilder from "@/build/vue-document-builder.vue";

describe("HelloWorld.vue", () => {
	it("renders  when passed", () => {
		const options = {
			width: "auto",
			height: "100vh",
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

		const wrapper = shallowMount(VueDocumentBuilder, {
			propsData: { options },
		});

		console.log(wrapper);
		expect(wrapper.text()).toMatch(options);
	});
});
