import axios from 'axios'
import * as fs from 'fs';
import readline from 'readline'
import path from 'path';

interface Data {
    firstName: string,
    lastName: string,
    nationalId: string,
    gender: string,
    mobile: string,
    cookie: string,
    captcha: string
}


async function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function getCaptcha() {
    return axios({
        method: "get",
        url: "http://doctorabbasi.ir/application/views/create_image.php?0.8053264878919875",
        headers: {
            "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.9,fa;q=0.8"
        },
        responseType: "stream"
    }).then((response) => {
        response.data.pipe(fs.createWriteStream('./dist/captcha.jpg'))
        console.log("Captcha Saved!")
        return response;
    })
}

async function main() {
    const pathToJson = path.resolve(__dirname, '../config.json');

    let data: Data;

    if (!fs.existsSync(pathToJson)) {
        const firstName = await askQuestion("Enter your First Name: ");
        const lastName = await askQuestion("Enter your Last Name: ");
        const nationalId = await askQuestion("Enter your nationalId: ");
        const gender = await askQuestion("Enter your gender(male/female): ");
        const mobile = await askQuestion("Enter your mobile number: ");

        data = {
            firstName,
            lastName,
            nationalId,
            gender,
            mobile,
            cookie: "",
            captcha: ""
        };
        fs.writeFileSync(pathToJson, JSON.stringify(data), { flag: "w" })
    }

    data = JSON.parse(fs.readFileSync(pathToJson, 'utf8'));

    const res = await getCaptcha();

    data.cookie = res.headers["set-cookie"]
    data.captcha = await askQuestion("A new captcha.jpg is saved at ./dist/captcha.jpg, Please enter it's number: ");

    const jsonData = JSON.stringify(data);
    fs.writeFileSync(pathToJson, jsonData);
}

main();


