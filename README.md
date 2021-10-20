# gjs-template-filler

### Installation

```
npm i vue-document-builder

yarn add vue-document-builder
```

## <span id="usage">Usage</span>

```js
<script>
import Vue from "vue";
import VueDocumentBuilder from "@/vue-document-builder.vue";

export default Vue.extend({
  name: "ServeDev",
  data: () => ({

  //Custom drag and drop components
  blocks: [
	{
		idk "person-details",
		label: "Personal Details",
		media: "<i class='fa fa-list-ul fa-3x'> </i>",
		content:	`
				<div data-property="full_name">
					[Full Name Here]
				</div>

				<!-- Date example -->
				<div data-property="date_of_birth" data-type="date">
					[Date Of Birth Here]
				</div>

				<!-- Custom format example -->
				<span data-property="age" data-type="custom" data-append=" years old"></span>

				<!-- Default value example -->
				<span data-property="status" data-default="N/A">[Status Here]</span>

				<!-- Percentage format example -->
				<div data-property="progress" data-type="percentage" data-precision="2">
					[Progress]
				</div>

				<!-- Array of String Example -->
				<div data-property="hobbies" data-seperator=",">
				Hobbies: <span data-value></span>
				</div>

				<div>
					<!-- Nested Property example -->
					Address: <br/> <span data-property="address.street">[Street Here]</span>
					...
				</div>

				<!-- Array of object example -->
				<table data-property="employment_details" border="1"  cellpadding="1">
					<caption style="text-align: left; margin-bottom: 5px"><b>Cash Collaterals</b></caption>
					<thead>
						<tr>
							<th data-key="employer" style="width: 20%;">&nbsp; Employer</th>
							<!-- Currency Example -->
							<th data-key="salary" data-type="currency" data-number-seperator="," data-symbol="$" data-precision="2">&nbsp; Salary</th>
						</tr>
					</thead>
				</table>
`}
		],

		//Default options. See additional options at https://grapesjs.com/docs/api/editor.html#editor
    options: {
	    //Width for the editor container
      width: "auto",

			//Height for the editor container
      height: "100vh",

			//Font Family to use on document
      fontFamily: "'Roboto', sans-serif",

			//Font size for paragraph tags
      fontSize: "14px",

			//Margin values for the page
      margin: {
        top: "1.5cm",
        right: "1.5cm",
        bottom: "1.5cm",
        left: "1.5cm",
      },

			// Show paddings and margins
      showOffsets: 1,

			// If true, will fetch HTML and CSS from selected container
      fromElement: true,

			 //Configurations for Storage Manager
      storageManager: false,

			//Additional Plugins
      plugins: [],

			//Configurations for Device Manager
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
    },
  }),
  components: {
    VueDocumentBuilder,
  },
  methods: {
    async onSave(htmlcss) {
      console.log(htmlcss);
    },
  },
});
</script>

<template>
  <div id="app">
    <vue-document-builder :options="options" :blocks="blocks" @save="onSave" />
  </div>
</template>
<style>
body {
  margin: 0px;
}
</style>
```

## Props

| Name | Description                                                  |
| ---- | ------------------------------------------------------------ |
| save | returns html with inline css when the save button is clicked |

## Props

| Name    | Default Value                                                                                                                                                                            | Description                               |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| blocks  | Array< [Block](#block-def) >                                                                                                                                                             | A list of custom drag and drop components |
| options | Object{ fontFamily: String, fontSize: String, margin: { top: String, right: String, bottom: String, left: String, },...[EditorConfiguration](https://grapesjs.com/docs/api/editor.html)} | Document editor configurations.           |

### <span id="block-def">Blocks</span>

A Block is an object which allows you to add aditional drag and drop functionalities to the editor. See usage above for example.

```js
//Structure
{
	id: String, //Unique identifier eg. user-details
	label: String, //Name of block
	media: String, //Fontawesome Icon eg. <i class='fa fa-account fa-3x'> </i>
	content: String // Html Content eg. <h2 data-propery="user.username>[Username]</h2>
}
```

In order to make the block content dynamic in the final html output add `data-property` to the html element in the content of the blocks with the object key from which the data will be populated. By doing this you can then use this [library](https://www.npmjs.com/package/gjs-template-filler) to populate the html output. See [Usage](#usage) for examples on how to make the blocks dynamic.

### Formatters

Formatters are denoted by the `data-type` attribute on an element and can have the value one of the following `number`, `percentage`, `currency` or `date`. If the `data-type` is not provided then the value remains as is. Formatters can also have specific options attached to them for instance, `data-precision` attribute which specify the number of decimal places to round a number to. **See options below.**

### Formatter Options

**Number**

Format a value to a number

| Options        | Default Value | Description                                         |
| -------------- | ------------- | --------------------------------------------------- |
| data-precision | 0             | The number of decimal places to round the number to |

**Number**

Format a value to a percentage

| Options        | Default Value | Description                                         |
| -------------- | ------------- | --------------------------------------------------- |
| data-precision | 0             | The number of decimal places to round the number to |

**Currency**

Formats a value to a specific currency

| Options               | Default Value | Description                                         |
| --------------------- | ------------- | --------------------------------------------------- |
| data-precision        | 0             | The number of decimal places to round the number to |
| data-symbol           | \$            | The currency symbol to display                      |
| data-number-seperator | ,             | The digit separator                                 |

**Date**

Tries to format value to the date format provided. If the date is already in the format, the `data-type` and `data-format` attribute can be left off.

| Options     | Default Value | Description                                                   |
| ----------- | ------------- | ------------------------------------------------------------- |
| data-format | -             | See date format options below. Eg. `data-format="yyyy-MM-dd"` |

Format string can be anything, but the following letters will be replaced (and leading zeroes added if necessary):

- dd - date.getDate()
- MM - date.getMonth() + 1
- yy - date.getFullYear().toString().substring(2, 4)
- yyyy - date.getFullYear()
- hh - date.getHours()
- mm - date.getMinutes()
- ss - date.getSeconds()
- SSS - date.getMilliseconds()
- O - timezone offset in +hm format (note that time will be in UTC if displaying offset)

**Custom**

Format value to a custom format by appending and/or prepending a custom string to it.

| Options      | Default Value | Description            |
| ------------ | ------------- | ---------------------- |
| data-append  |               | Comes after the value  |
| data-prepend |               | Comes before the value |
