const {socialMediaCountGenerator, getDates, stockPriceGenerator, recommendationAlgorithm} = require( './business_logic');


test('stockPriceGenerator', () => {
    let days = [ '2020/11/15', '2020/11/14', '2020/11/13', '2020/11/12' ]
    let priceArray = stockPriceGenerator('ABC', days);

    expect(priceArray.length).toBe(4);
    expect(priceArray[0].date).toBe('2020/11/15');
    // expect(priceArray[0].price).toBeGreaterThan(0.01).toBeLessThan(1350)
})

test('get dates', () => {
    let dateArray = getDates('2020-11-12', '2020-11-15');

    expect(dateArray).toStrictEqual([ '2020/11/15', '2020/11/14', '2020/11/13', '2020/11/12' ])
})

test('social media counter', () => {

    expect(socialMediaCountGenerator('ABC', 'Twitter')).toBeGreaterThan(5);
    expect(socialMediaCountGenerator('ABC', 'Twitter')).toBeLessThan(100)

})

test('recommendations', () => {
    let stockPriceArr = [{"date": '2020/11/15', "price": 5.66}, {"date": '2020/11/14', "price": 8.99}]
    let rec = recommendationAlgorithm(stockPriceArr, 5)
    expect(rec).toBe('HOLD')
})