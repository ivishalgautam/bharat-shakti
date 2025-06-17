export async function sendOtp({ country_code = "+91", phone, name, otp }) {
  let axiosConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://pgapi.smartping.ai/fe/api/v1/send?username=${config.smartping_username}&password=${config.smartping_password}&unicode=false&from=BHASKT&to=${phone}&text='Your%20OTP%20for%20Registration%20on%20https://bharatshaktitenders.com/%20is%20123456.%20It%20is%20valid%20for%205%20minutes.%20Please%20do%20not%20share%20this%20OTP%20with%20anyone&dltContentId=${config.smartping_content_id}`,
    headers: {},
  };

  axios
    .request(axiosConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
