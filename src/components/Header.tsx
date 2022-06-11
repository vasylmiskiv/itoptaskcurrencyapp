import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";

const requestUrl = "https://api.exchangerate.host/latest";

export default function Header() {
  const [usd, setUsd] = useState(0);
  const [eur, setEur] = useState(0);

  useEffect(() => {
    axios.get(`${requestUrl}?base=USD`).then((response) => {
      setUsd(response.data.rates["UAH"]);
    });
    axios.get(`${requestUrl}?base=EUR`).then((response) => {
      setEur(response.data.rates["UAH"]);
    });
  }, []);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container fluid="sm">
          <Navbar.Brand>Currency app</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <div>UAH / USD: {usd.toFixed(2)}</div>
              <div>UAH / EUR: {eur.toFixed(2)}</div>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
