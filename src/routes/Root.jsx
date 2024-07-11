import "../css/Root.css";
import drink2 from "../assets/drink2.png";
import wall from "../assets/woodwall.png";
import header from "../assets/header.png";
import {
  Navbar,
  Container,
  Row,
  Col,
  Button,
  Input,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { useEffect, useState } from "react";
import api from "../services/coktailDbAPI";

export default function Root() {
  const [data, setData] = useState([]);
  const [random, setRandom] = useState([]);
  const [search, setSearch] = useState("");
  let leter = "";

  useEffect(() => {
    const getRandomLetter = () => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      return alphabet[randomIndex];
    };

    leter = getRandomLetter();

    async function fetchData() {
      const response = await api.get("search.php?f=" + leter);

      setData(response.data.drinks || []);
    }
    fetchData();

    async function fetchRandom() {
      const response = await api.get("random.php");

      setRandom(response.data.drinks || []);
    }
    fetchRandom();
  }, []);

  const handleSearch = async () => {
    const response = await api.get("search.php?s=" + search);

    setRandom(response.data.drinks || []);
    setSearch("");
  };

  return (
    <>
      <Navbar className="bg-nav" style={{ backgroundImage: `url(${header})` }}>
        <Container fluid>
          <Row>
            <Col md="2">
              <a
                href="https://www.thecocktaildb.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <img className="logo-img" src={drink2} alt="Logo" />
                <span className="logo">
                  <strong>RT</strong>
                </span>
              </a>
            </Col>
            <Col md="8" className="text-center">
              <h1 className=" pt-5 bg-filter" style={{ fontSize: "5rem" }}>
                <strong>REACTAIL</strong>
              </h1>
              <h2 className="bg-filter">
                Enjoy a great variety of drink recipes
              </h2>
              <h2 className="bg-filter text-center">
                Se yourself and chose an option
              </h2>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Container
        className="hero p-0"
        style={{ backgroundImage: `url(${wall})` }}
        fluid
      >
        <div className="filter row text-center p-3">
          <strong>A sortable example of tastefull Cocktails</strong>
        </div>
        <Row className="p-5">
          {random.length > 0 ? (
            data.map(
              (item, index) =>
                index < 10 && (
                  <div
                    className="col-md-2 p-5"
                    id={item.idDrink}
                    key={item.idDrink}
                  >
                    <div
                      className="icon-box thumb p-7"
                      style={{ backgroundImage: `url(${item.strDrinkThumb})` }}
                    ></div>
                    <div className="row pt-2">
                      <div className="col-2">
                        <span
                          className="badge bg-secondary"
                          style={{ borderRadius: "10px !important;" }}
                        >
                          <b style={{ fontSize: "16px" }}>{item.strDrink}</b>
                        </span>
                      </div>
                    </div>
                  </div>
                ),
            )
          ) : (
            <h1> No data found! </h1>
          )}
        </Row>
      </Container>
      <Container className="bg-searches" fluid>
        <div className="filter row justify-content-center p-3">
          <Col md="2">
            <Input
              className="input-filter"
              placeholder="write a drink name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md="1">
            <Button className="btn-filter" onClick={() => handleSearch()}>
              Buscar
            </Button>
          </Col>
        </div>
        <div className="row justify-content-center">
          <Col md="4">
            {random.map(
              (item, index) =>
                index < 10 && (
                  <>
                    <Card className="my-2">
                      <CardImg
                        alt="Card image cap"
                        src={item.strDrinkThumb}
                        style={{
                          height: 380,
                        }}
                        top
                        width="100%"
                      />
                      <CardBody>
                        <CardTitle className="text-center" tag="h5">
                          {item.strDrink}
                        </CardTitle>
                        <CardText className="text-center">
                          - Ingredients -<br />
                          {item.strIngredient1 + "-" + item.strMeasure1}
                          <br />
                          {item.strIngredient2 + "-" + item.strMeasure2}
                          <br />
                          {item.strIngredient3 + "-" + item.strMeasure3}
                          <br />
                          - How to do -<br />
                          {item.strInstructions}
                        </CardText>
                        <CardText>
                          <small className="text-muted">
                            {item.dateModified}
                          </small>
                        </CardText>
                      </CardBody>
                    </Card>
                  </>
                ),
            )}
          </Col>
        </div>
      </Container>
    </>
  );
}
