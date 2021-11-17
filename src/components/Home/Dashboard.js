import React, { useState, useEffect } from "react";

import InfoCard from "../Cards/InfoCard";
import ChartCard from "../Chart/ChartCard";
import ChartLegend from "../Chart/ChartLegend.js";
import { Doughnut, Line } from "react-chartjs-2";
import response from "../../utils/tableData";

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

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/chartData";

import Profile from "../../assets/profile.png";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage]);

  return (
    <>
      <Card className="bg-indigo-100 mt-12">
        <CardBody className="m-12 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-indigo-600">
              Welcome back, Sean 🌒
            </h1>
            <h1 className="mt-4 text-md text-indigo-600">
              You have a large transaction made this month! <br />
              Would you like to convert it into a loan?
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
        <InfoCard title="Total clients" value="6389" />

        <InfoCard title="Account balance" value="$ 46,760.89" />

        <InfoCard title="New sales" value="376" />

        <InfoCard title="Pending contacts" value="35" />
      </div>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Transaction History
      </h1>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
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

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
