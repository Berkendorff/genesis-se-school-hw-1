const axios = require('axios');
const {uahUsdRateServiceURL, usdBtcRateServiceURL} = require('../app/config/rater')();

module.exports =  async () => {
    const responseNBU = await axios.get(uahUsdRateServiceURL);
    const uahUsdRate = +responseNBU.data[0].rate;
    const responseBCN = await axios.get(usdBtcRateServiceURL);
    const usdBtcRate = +responseBCN.data.USD.last;
    return uahUsdRate * usdBtcRate;
}
