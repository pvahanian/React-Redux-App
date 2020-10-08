import React, { useState } from "react";
import { connect } from "react-redux";

const SearchForm = (props) => {
  const [searchTicker, setSearchTicker] = useState("TSLA");

  const onChange = (e) => {
     setSearchTicker(e.target.value);
  };

  const onSubmit = (e) => {
    
    e.preventDefault();
      props.setUrl(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${searchTicker}&interval=5min&apikey=ZZERN3GSXZ5E1U0M`
    );


  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={searchTicker}
          placeholder="TSLA"
        />
        <button>Search</button>
      </form>

  <p>Today's Date is {props.date}
  
  {props.stocks ? props.stocks.map((stock) =>{ 
  return((<div>{stock["Meta Data"]["2. Symbol"]} Stock Close {stock["Time Series (Daily)"][props.date]["4. close"]}  Stock Open {stock["Time Series (Daily)"][props.date]["1. open"]} </div>))
  }): "Nothing here yet"}
  </p>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    stocks: state.stocks,
    date: state.date,
  };
};

export default connect(mapStateToProps, {})(SearchForm);