const captcha = require('../tess');
const requestPauser = require('../utils/requestPauser');

async function captchaHandling(page, link, time_now){
  await page.goto(link);
  await page.waitForSelector('#Image2');
  // Take the element to be captured
  const element = await page.$("#Image2");
  await element.screenshot({
    path: `images/telangana-captcha-${time_now}.jpg`
  });
  const text = await captcha(`/images/telangana-captcha-${time_now}.jpg`);
  console.log(text);
  // await page.type('input[name=txtVerificationCode]', text);
  // await page.$("#btnSubmit").click();
  // delete image
  await page.waitForTimeout(10000);
  // close browser
}

// https://ceoaperolls.ap.gov.in/AP_Eroll_2023/Popuppage?partNumber=141&roll=EnglishMotherRoll&districtName=DIST_15&acname=106&acnameeng=A106&acno=106&acnameurdu=106
async function telangana(dist, ac, pn){
  const URL = `https://ceotserms2.telangana.gov.in/ts_erolls/Popuppage.aspx?partNumber=${pn.toString().padStart(3, "0")}&roll=EnglishMotherRoll&districtName=DIST_${dist.toString().padStart(2, "0")}&acname=AC_${ac.toString().padStart(3, "0")}&acnameeng=A${ac}&acno=${ac}&acnameurdu=0${ac}`;

  await requestPauser(URL, captchaHandling);
  // Do somehting with pdf [take epic id too above]
}

module.exports = telangana;
//telangana(16, 47, 125)