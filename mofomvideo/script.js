const LOCAL_HISTORY = [];
const VIDEO_API = "https://hefollo.com/apis.php?type=";
const VIDEO_TYPES = [
	{
		name: "standard type",
		key: "小姐姐视频",
		subType: true,
		subTypeArray: [
			{
				name: "subtype1",
				key: "1分区",
			},
			{
				name: "cosplay",
				key: "COS分区",
			}
		]
	},
	{
		name: "recommended",
		key: "优质小姐姐视频",
		subType: false,
	}
];

const DEFAULT_VIDEO_TYPE = VIDEO_TYPES[1];
var activeVideoApiRequestUrl = `${VIDEO_API}${DEFAULT_VIDEO_TYPE.key}`;


// console.log(activeVideoApiRequestUrl);