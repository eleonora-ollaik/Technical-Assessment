const moment = require("moment");

//takes in an array of dates and generates prices for each day
const stockPriceGenerator = (symbol, dateArray) => {
    let min = 0.01;
    let max = 1350; // Price of the most expensive stock on TSX as per Jan 22, 2020 - Constellation Software (TSX:CSU) (https://ca.finance.yahoo.com/news/most-expensive-stock-canada-top-133345919.html#:~:text=In%20Canada%2C%20the%20best%20example,price%20on%20the%20TSX%20Index.)
    let priceArray = [];
    for (let i=0; i< dateArray.length; i++) {
        let o= Object.create({});
        o.date = dateArray[i]
        let price = Math.random() * (max-min);
        o.price= Number(price.toFixed(2));
        priceArray.push(o);
    }
    console.log(priceArray)
    return priceArray
};

//function to get an array of dates given the start and end of the period
const getDates = (startDate, endDate) => {
  let dateArray = [];
  let eDate = moment(endDate).format("YYYY/MM/DD");
  let sDate = moment(startDate).format("YYYY/MM/DD");
  let currentDate = eDate;
  dateArray.push(eDate);

  do {
    let daybefore = moment(currentDate).add(-1, "days").format("YYYY/MM/DD");
    dateArray.push(daybefore);
    currentDate = daybefore;
  } while (currentDate > sDate);
  return dateArray;
}

//generates number of posts
const socialMediaCountGenerator = () => {
  let min = Math.ceil(5);
  let max = Math.floor(100);
  let count = Math.floor(Math.random() * (max - min + 1) + min);

  return count;
};


//dummy recommendation algorithm: to create a real one need more data
const recommendationAlgorithm = (stockPriceArr, smCount) => {
    let latestPrice = stockPriceArr[0].price;
    if (latestPrice >= stockPriceArr[1].price) {
        return "SELL"
    } else if (latestPrice <= stockPriceArr[1].price){
        return "BUY"
    } 
    else {
        console.log(latestPrice, stockPriceArr[1].price)
        return "HOLD"
    }
    
};

module.exports = { socialMediaCountGenerator, getDates, stockPriceGenerator, recommendationAlgorithm };
