import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { bankingSelector } from "../../store/bank";

import { Listbox, Transition, Dialog } from "@headlessui/react";
import { BsCheck2 } from "react-icons/bs";
import { HiSelector } from "react-icons/hi";

import axios from "axios";

const Products: React.FC<{}> = () => {
  const { transactions, products, balance } = useSelector(bankingSelector);

  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);
  let [isOpen3, setIsOpen3] = useState(false);

  const eligibleLoans = transactions.filter(
    (transaction: any) => transaction.amount >= 5000
  );

  const location = useLocation();

  let transaction = null;

  if (location.state) {
    transaction = location.state.transaction;
  }

  const initial =
    transaction === null ? eligibleLoans[0].transactionID : transaction;

  const [selected, setSelected] = useState(initial);

  const transactionInstance = eligibleLoans.find(
    (x: any) => x.transactionID === selected
  );

  const getAccount = balance.find((b: any) => b.balance > 0);

  const accountID = getAccount.accountID;
  const ownerID = getAccount.ownerID;

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  function closeModal3() {
    setIsOpen3(false);
  }

  const openModal = async () => {
    setIsOpen(true);

    const { data } = await axios.post(process.env.REACT_APP_LOAN + "/new", {
      accountID,
      userID: ownerID,
      amount: Number(transactionInstance.amount),
      term: 3,
    });

    console.log(data)

  };

  const openModal2 = async () => {
    setIsOpen2(true);

    const { data } = await axios.post(process.env.REACT_APP_LOAN + "/new", {
      accountID,
      userID: ownerID,
      amount: Number(transactionInstance.amount),
      term: 6,
    });

    console.log(data);
  };

  const openModal3 = async () => {
    setIsOpen3(true);

    const { data } = await axios.post(process.env.REACT_APP_LOAN + "/new", {
      accountID,
      userID: ownerID,
      amount: Number(transactionInstance.amount),
      term: 12,
    });

    console.log(data);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-in"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  3 Months Loan Approved
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your loan has been approved. We will proceed to credit the
                    original amount back to your account.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isOpen2} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal2}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-in"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  6 Months Loan Approved
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your loan has been approved. We will proceed to credit the
                    original amount back to your account.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal2}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isOpen3} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal3}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-in"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  12 Months Loan Approved
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your loan has been approved. We will proceed to credit the
                    original amount back to your account.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal3}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 text-left lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase rounded-full">
              Recommended Products
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
            Products curated for you based on your portfolio
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            From your transaction history, we have the following loan products
            for you:
          </p>
          <div className="h-1 mt-5 ml-auto duration-300 origin-left transform bg-indigo-600 scale-x-30 group-hover:scale-x-100" />

          <div className="w-72 mt-5 relative z-10">
            <p className="text-gray-700 text-md font-bold">
              Select a transaction:
            </p>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-5">
                <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{selected}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiSelector className="w-5 h-5 text-gray-400" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {eligibleLoans.map((transaction: any) => (
                      <Listbox.Option
                        key={transaction.id}
                        className={({ active }) =>
                          `${
                            active
                              ? "text-green-900 bg-green-100"
                              : "text-gray-900"
                          }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={transaction.transactionID}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {transaction.transactionID}
                            </span>
                            {selected ? (
                              <span
                                className={`${
                                  active ? "text-green-600" : "text-green-600"
                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <BsCheck2 className="w-5 h-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-2">
            <div className="text-center md:border-r">
              <h6 className="text-4xl font-bold">{selected}</h6>
              <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Transaction ID
              </p>
            </div>
            <div className="text-center">
              <h6 className="text-4xl font-bold">
                ${" "}
                {Number(transactionInstance.amount)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </h6>
              <p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Loan Amount
              </p>
            </div>
          </div>
        </div>
        <div className="py-16 max-w-screen-xl">
          <div className="grid gap-10 grid-cols-3">
            <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
              <div className="text-center">
                <div className="text-lg font-semibold mb-3">
                  {products[0].period} Months Financing
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="mr-1 text-4xl font-bold">
                    ${" "}
                    {(
                      (Number(transactionInstance.amount) +
                        Number(
                          transactionInstance.amount *
                            (products[0].interestRate / 100)
                        )) /
                      3
                    ).toFixed(2)}
                  </div>
                  <div className="text-gray-700">/ mo</div>
                </div>
                <div className="my-5 space-y-3">
                  <div className="text-gray-700">
                    Interest Rate: {products[0].interestRate}%
                  </div>
                  <div className="text-gray-700">
                    Total Payable Amount: ${" "}
                    {(
                      Number(transactionInstance.amount) +
                      Number(
                        transactionInstance.amount *
                          (products[0].interestRate / 100)
                      )
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center w-full h-12 px-6 mt-3 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                >
                  Apply 3 months loan
                </button>
                <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                  Terms and Conditions apply
                </p>
              </div>
            </div>
            <div className="relative flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow border-indigo-500">
              <div className="absolute inset-x-0 top-0 flex justify-center -mt-3">
                <div className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase rounded bg-indigo-500">
                  Most Popular
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold mb-3">
                  {products[1].period} Months Financing
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="mr-1 text-4xl font-bold">
                    ${" "}
                    {(
                      (Number(transactionInstance.amount) +
                        Number(
                          transactionInstance.amount *
                            (products[1].interestRate / 100)
                        )) /
                      6
                    ).toFixed(2)}
                  </div>
                  <div className="text-gray-700">/ mo</div>
                </div>
                <div className="my-5 space-y-3">
                  <div className="text-gray-700">
                    Interest Rate: {products[1].interestRate}%
                  </div>
                  <div className="text-gray-700">
                    Total Payable Amount: ${" "}
                    {(
                      Number(transactionInstance.amount) +
                      Number(
                        transactionInstance.amount *
                          (products[1].interestRate / 100)
                      )
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={openModal2}
                  className="inline-flex items-center justify-center w-full h-12 px-6 mt-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-indigo-500 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                >
                  Apply 6 months loan
                </button>
                <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                  Terms and Conditions apply
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border rounded shadow-sm sm:items-center hover:shadow">
              <div className="text-center">
                <div className="text-lg font-semibold mb-3">
                  {products[2].period} Months Financing
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="mr-1 text-4xl font-bold">
                    ${" "}
                    {(
                      (Number(transactionInstance.amount) +
                        Number(
                          transactionInstance.amount *
                            (products[2].interestRate / 100)
                        )) /
                      12
                    ).toFixed(2)}
                  </div>
                  <div className="text-gray-700">/ mo</div>
                </div>
                <div className="my-5 space-y-3">
                  <div className="text-gray-700">
                    Interest Rate: {products[2].interestRate}%
                  </div>
                  <div className="text-gray-700">
                    Total Payable Amount: ${" "}
                    {(
                      Number(transactionInstance.amount) +
                      Number(
                        transactionInstance.amount *
                          (products[2].interestRate / 100)
                      )
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={openModal3}
                  className="inline-flex items-center justify-center w-full h-12 px-6 mt-3 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                >
                  Apply 12 months loan
                </button>
                <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
                  Terms and Conditions apply
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
