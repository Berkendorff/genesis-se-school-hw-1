const axios = require('axios');

module.exports =  async () => {
    const responseNBU = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
    const uahUsdRate = +responseNBU.data[0].rate;
    const responseBCN = await axios.get('https://blockchain.info/ticker');
    const usdBtcRate = +responseBCN.data.USD.last;
    return uahUsdRate * usdBtcRate;
}
