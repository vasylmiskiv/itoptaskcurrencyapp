import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import "./Converter.scss";

const requestUrl = "https://api.exchangerate.host/latest";

export const Converter: React.FC = () => {
  const [currencies, _setCurrencies] = useState(["USD", "UAH", "EUR"]);
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("UAH");
  const [difference, setDifference] = useState(0);
  const [amount, setAmount] = useState("1");
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  const [loader, setLoader] = useState(true);

  let firstAmount, secondAmount;

  if (amountFromCurrency) {
    firstAmount = amount;
    secondAmount = (Number(amount) * difference).toFixed(2);
  } else {
    secondAmount = amount;
    firstAmount = (Number(amount) / difference).toFixed(2);
  }

  const getDifference = () => {
    axios.get(`${requestUrl}?base=${firstCurrency}`).then((res) => {
      setDifference(res.data.rates[secondCurrency]);
    });
  };

  useEffect(() => {
    getDifference();
    setLoader(false);
  }, []);

  useEffect(() => {
    getDifference();
  }, [firstCurrency, secondCurrency]);

  const onFirstAmount = (e: any) => {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  };

  const onSecondAmount = (e: any) => {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  };

  return (
    <div className="converter">
      {loader ? (
        <Spinner className="spinner" animation="border" variant="primary" />
      ) : (
        <Form className="form">
          <div>
            <Form.Label htmlFor="inputPassword5">Currency 1</Form.Label>
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                type="number"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={firstAmount}
                onChange={(e) => onFirstAmount(e)}
              />
            </InputGroup>
            <Form.Select
              size="lg"
              aria-label="Default select example"
              value={firstCurrency}
              onChange={(e) => setFirstCurrency(e.target.value)}
            >
              {currencies.map((currency, i) => (
                <option key={i} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </div>

          <div>
            <Form.Label htmlFor="inputPassword5">Currency 2</Form.Label>
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                type="number"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={secondAmount}
                onChange={(e) => onSecondAmount(e)}
              />
            </InputGroup>
            <Form.Select
              size="lg"
              aria-label="Default select example"
              value={secondCurrency}
              onChange={(e) => setSecondCurrency(e.target.value)}
            >
              {currencies.map((currency, i) => (
                <option key={i}>{currency}</option>
              ))}
            </Form.Select>
          </div>
        </Form>
      )}
    </div>
  );
};
