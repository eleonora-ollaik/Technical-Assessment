import React, { useState } from "react";
import "./mainForm.css";
import SymbolsSelectOption from "../selectors/SymbolsSelectOption";
import SocialMediaSelectOption from "../selectors/SocialMediaSelectOption.js";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
  getDates,
  stockPriceGenerator,
  socialMediaCountGenerator,
  recommendationAlgorithm,
} from "../../business_logic/business_logic";
import Table from "../table/Table";
import ModalBox from "../modal/ModalBox";
const moment = require("moment");

export default function MainForm() {
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [currentSocialMedia, setSocialMedia] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [datesArray, setDatesArray] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [noticeMsg, setNoticeMsg] = useState();

  //setting default of 10 days prior to the date that was picked
  const onCalendarChange = (date) => {
    setEndDate(date);
    let startDate = moment(date).add(-10, "days");
    setStartDate(startDate);
  };

  // event on click 'Generate' button
  const onGenerateClick = () => {
    //setting up message for the modal
    if (currentSymbol === "" || currentSocialMedia === "") {
      setNoticeMsg("You have to choose a symbol, date and a social media type");
    } else {
      //formatting date
      let sDate = moment(startDate).format("YYYY/MM/DD");
      let eDate = moment(endDate).format("YYYY/MM/DD");

      //calling getDates function to get an array out of dates in range
      let datesArray = getDates(sDate, eDate);
      let posts = socialMediaCountGenerator();
      setDatesArray(datesArray);

      //generating prices for each day in array
      let prices = stockPriceGenerator(currentSymbol, datesArray);

      //generating recommendation (BUY, HOLD, SELL) based on prices and number of posts
      let rec = recommendationAlgorithm(prices, posts);

      //forming a new data object that can later be passed to database as an entry
      const newEntry = {
        //id:
        symbol: currentSymbol,
        socialMedia: currentSocialMedia,
        posts: posts,
        prices: prices,
        rec: rec,
      };

      setNewEntry(newEntry);
    }
  };

  //on click event: closing modal
  const onClickCloseModal = (e) => {
    const modal = e.target.parentNode.parentNode;
    modal.setAttribute("class", "modalhide");
    setNoticeMsg("");
  };

  //setting up hide parameter for the modal (if true, modal won't be seen)
  const hidemsg = noticeMsg ? false : true;

  return (
    <div className="mainFormContainer">
      <div className="message">
        {" "}
        This app is meant to help you get more information about correlation
        between stock prices and company's activity online. Feel free to choose
        a company, social network type and day for which you need a recommendation.
        Good luck and happy trading!
      </div>
      <div className="row">
        <div className="label-input">
          <span>Please select a symbol:</span>
          <select
            name="symbol"
            value={currentSymbol}
            onChange={(e) => setCurrentSymbol(e.target.value)}
          >
            <option value="" disabled>
              Select a symbol
            </option>
            <SymbolsSelectOption />
          </select>
        </div>
        <div className="label-input">
          <span>Please select a date:</span>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={onCalendarChange}
            minDate={addMonths(new Date(), -5)}
            maxDate={new Date()}
            todayButton="Today"
            popperPlacement="right"
            popperModifiers={{
              offset: {
                enabled: true,
                offset: "5px, 10px",
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                boundariesElement: "viewport",
              },
            }}
          />
        </div>
        <div className="label-input">
          <span>Please select a social media type:</span>
          <select
            name="selectedSM"
            value={currentSocialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
          >
            <option value="" disabled>
              Select a social media type
            </option>
            <SocialMediaSelectOption />
          </select>
        </div>
      </div>

      <button onClick={onGenerateClick}>Get recommendation</button>
      {datesArray.length === 0 ? null : (
        <div>
          <Table newEntry={newEntry} />
          <div className="chartContainer">
          </div>
        </div>
      )}
      <ModalBox
        content={noticeMsg}
        onClickCloseModal={onClickCloseModal}
        hide={hidemsg}
      />
    </div>
  );
}
