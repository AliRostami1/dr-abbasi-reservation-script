import axios from "axios";
import * as fs from "fs";
import path from "path";

interface Data {
  firstName: string;
  lastName: string;
  nationalId: string;
  gender: string;
  mobile: string;
  cookie: string;
  captcha: string;
}
const pathToJson = path.resolve(__dirname, "../config.json");
const data: Data = JSON.parse(fs.readFileSync(pathToJson, "utf8"));

async function submit() {
  return axios({
    method: "post",
    url: "http://doctorabbasi.ir/application/views/ajax/add.php",
    headers: {
      accept: "text/javascript, text/html, application/xml, text/xml, */*",
      "accept-language": "en-US,en;q=0.9,fa;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-prototype-version": "1.7",
      "x-requested-with": "XMLHttpRequest",
      cookie: data.cookie,
    },
    data: `act=addReserve&firstname=${data.firstName}&family=${data.lastName}&nationalId=${data.nationalId}&year=0&active=1&gender=${data.gender}&mobile=${data.mobile}&phone=0&capcha=${data.captcha}&scheduleId=74933&serviceType=17&reserveGroupId=0&callingPage=patient&reserveType=1&come=1&age=0&fatherName=&address=&reserveTimeSpaceFlag=0&dossierId=`,
  });
}

async function main() {
  const cancelInterval = setInterval(async () => {
    const res = await submit();
    console.log(res.data);
    if (res.data.returnResult !== "fullList") clearInterval(cancelInterval);
  }, 1000);
}

main();
