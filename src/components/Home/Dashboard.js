import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { bankingSelector } from "../../store/bank";

import InfoCard from "../Cards/InfoCard";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Badge,
  Pagination,
  Card,
  CardBody,
} from "@windmill/react-ui";

import Profile from "../../assets/profile.png";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const { loading, transactions, balance } = useSelector(bankingSelector);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = transactions.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(
      transactions.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
  }, [page, resultsPerPage, transactions]);

  const getAccount = balance.filter((b) => b.balance > 0)[0];

  return (
    <>
      <Card className="bg-indigo-100 mt-12">
        <CardBody className="m-12 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-indigo-600">
              Welcome back, {getAccount.ownerID} 🌒
            </h1>
            <h1 className="mt-4 text-md text-indigo-600">
              You have made a couple of big transactions this month! <br />
              Check out the loan products we have in store for you 🥳
            </h1>
          </div>
          <div>
            <img
              src={Profile}
              alt="profile"
              className="h-32 object-cover object-top w-40"
            />
          </div>
        </CardBody>
      </Card>

      {/* <!-- Cards --> */}
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Dashboard
      </h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Account ID" value={getAccount.accountID}>
          <div className="flex items-center justify-center w-8 h-8 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-10 h-10 text-indigo-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
        </InfoCard>

        <InfoCard
          title="Account balance"
          value={`$ ${Number(getAccount.balance)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`}
        >
          <div className="flex items-center justify-center w-8 h-8 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-10 h-10 text-indigo-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
        </InfoCard>

        <InfoCard title="Active Loans" value="3">
          <div className="flex items-center justify-center w-8 h-8 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-10 h-10 text-indigo-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
        </InfoCard>

        <InfoCard title="Monthly Repayment" value="$ 1000">
          <div className="flex items-center justify-center w-8 h-8 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-10 h-10 text-indigo-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
        </InfoCard>
      </div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Transaction History
      </h1>
      {!loading ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Transaction</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Eligible</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {data.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">
                          Transaction ID: {user.transactionID}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Account ID: {user.accountID}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">$ {user.amount}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.date).toDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {user.amount >= 5000 ? (
                        <Link
                          to="/product"
                          state={{ transaction: user.transactionID }}
                        >
                          <Badge
                            type={user.status}
                            className="hover:bg-indigo-500 hover:text-white transform transition-all duration-300"
                          >
                            Eligible
                          </Badge>
                        </Link>
                      ) : null}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          </TableFooter>
        </TableContainer>
      ) : null}

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard> */}
      </div>
    </>
  );
}

export default Dashboard;
