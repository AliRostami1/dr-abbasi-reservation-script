import axios from 'axios'
import * as fs from 'fs';

async function submit() {

	axios({
		method: 'post',
		url: "http://doctorabbasi.ir/application/views/ajax/add.php",
		headers: {
			"accept": "text/javascript, text/html, application/xml, text/xml, */*",
			"accept-language": "en-US,en;q=0.9,fa;q=0.8",
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			"x-prototype-version": "1.7",
			"x-requested-with": "XMLHttpRequest",
			"cookie": "PHPSESSID=fl9u7disbest4mediq29igvpd1",
		},
		data: "act=addReserve&firstname=فاطمه&family=شریفی&nationalId=0858679426&year=0&active=1&gender=female&mobile=09155571756&phone=0&capcha=86501&scheduleId=74933&serviceType=17&reserveGroupId=0&callingPage=patient&reserveType=1&come=1&age=0&fatherName=&address=&reserveTimeSpaceFlag=0&dossierId=",
	}).then((response) => console.log(response))
}

// submit()


async function getCaptcha() {
	// const captchaResult = await fetch("http://doctorabbasi.ir/application/views/create_image.php?0.8053264878919875", {
	// 	"headers": {
	// 		"accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
	// 		"accept-language": "en-US,en;q=0.9,fa;q=0.8",
	// 		"cookie": "PHPSESSID=fl9u7disbest4mediq29igvpd1",
	// 	},
	// 	"body": undefined,
	// 	"method": "GET",
	// });

	axios({
		method: "get",
		url: "http://doctorabbasi.ir/application/views/create_image.php?0.8053264878919875",
		headers: {
			"accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
			"accept-language": "en-US,en;q=0.9,fa;q=0.8",
			"cookie": "PHPSESSID=fl9u7disbest4mediq29igvpd1",
		},
		responseType: "stream"
	}).then((response) => {
		response.data.pipe(fs.createWriteStream('captcha.jpg'))
		console.log("captcha saved!")
	})

}

getCaptcha();