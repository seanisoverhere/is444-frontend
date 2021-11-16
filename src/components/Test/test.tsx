import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Test: React.FC<{}> = () => {
  const [account, setAccount] = useState(false);
  useEffect(() => {
    var ApiURL = "http://tbankonline.com/SMUtBank_API/Gateway";
    var headerObj = {
      Header: {
        serviceName: "getCustomerAccounts",
        userID: "tammy.lim.2019",
        PIN: "123456",
        OTP: "458809"
      }
    };
    var header = JSON.stringify(headerObj);
    // got some need contentObj also, so need to refer to their documentation
    
    const fetchInfo = async () => {
      await axios.post(ApiURL + "?Header=" + header)
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
          let AccountList = response.data.Content.ServiceResponse.AccountList.account;
          console.log(AccountList[0]);
          setAccount(AccountList[0])
        }
        ).catch(error => {
          console.log(error)
        })
    }
    fetchInfo();
  }, [])
  return (
    <>
      <div>Account ID: {account.accountID}</div>
      <div>Account Balance: {account.balance}</div>
    </>
  );
};

export default Test;
