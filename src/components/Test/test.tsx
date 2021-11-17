import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Test: React.FC<{}> = () => {
  // const [account, setAccount] = useState(false);
  useEffect(() => {
    var ApiURL = "http://tbankonline.com/SMUtBank_API/Gateway";
    var headerObj = {
      Header: {
        serviceName: "getBenchmarkInterestRates",
        userID: "",
        PIN: "",
        OTP: ""
      }
    };
    var header = JSON.stringify(headerObj);
    // got some need contentObj also, so need to refer to their documentation

    const fetchInfo = async () => {
      await axios.post(ApiURL + '?Header=' + header)
        .then((response) => {
          let serviceRespHeader = response.data.Content.ServiceResponse.ServiceRespHeader;
          let globalErrorID = serviceRespHeader.GlobalErrorID;
          if (globalErrorID === "010041") {
            alert("globalErrorID 010041 - OTP Expired");
            return;
          }
          else if (globalErrorID !== "010000") {
            alert("globalErrorID 010000");
            return;
          }
          const interestRates = response.data.Content.ServiceResponse.InterestRateList.InterestRateItem;
          let sgBenchmarkInterestRates = [];
          for (let info of interestRates){
            if (info.country == 'Singapore' && info.period !== "1M"){
              sgBenchmarkInterestRates.push({
                "interestRate":(info.interestRate * 0.9).toFixed(4), 
                "period":info.period,
              })
              console.log(sgBenchmarkInterestRates);
            }
          }
          
        }
        ).catch(error => {
          console.log(error)
        })
    }
    fetchInfo();
  }, [])
  return (
    <>
      {/* <div>Account ID: {account.accountID}</div>
      <div>Account Balance: {account.balance}</div> */}
    </>
  );
};

export default Test;
