/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useContext,  useState} from "react";
// react plugin used to create charts
// import { Line } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  // CardFooter,
  CardTitle,
  // ListGroupItem,
  // ListGroup,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";

// core components
// import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
// import Footer from "components/Footer/Footer.js";

// import bigChartData from "variables/charts.js";


// import Web3Context for the web3 instance
import { Web3Context } from "Context/Web3Context";
// import axios for http requests
import axios from "axios";
import { apiEndpoint } from "config";
import { NftContext } from "Context/NftContext";
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const history = useHistory()
  const [fungibleTokenContractAbi, setFungibleContractAbi] = useState()
  const [tokenAddress, setTokenAddress] = useState()
  const [balance, setBalance] = useState(0)
  const [tokens, setTokens] = useState([])
  const [nfts, setNfts] = useState([])
  const [nft, setNft] = useState({})
  const {nftContext, setNftContext} = useContext(NftContext)
  const [account, setAccount] = useState(null)
  const {web3Context} = useContext(Web3Context)
  React.useEffect(() => {
    // web3.eth.getAccounts().then(accounts => setAccount(accounts[0]))
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  React.useEffect(() => {
    if(web3Context.eth){
      let web3 = web3Context
      web3.eth.getAccounts().then(accounts => setAccount(accounts[0]))
      
    }
  },[web3Context])

  React.useEffect(() => {
    axios.get(`${apiEndpoint}/token`).then(response =>{
      setTokens(response.data)
      console.log(response.data)
    })
    .catch(console.log)
  },[])


  const getFungibleTokenBalance = (e) => {
    e.preventDefault()
    let {abi, address} = JSON.parse(e.target.value)
    if(web3Context.eth){
      let web3 = web3Context
      let contractInstance = new web3.eth.Contract(abi, address)
      contractInstance.methods.balanceOf(account).call({from: account}, (error, result) => {
        setBalance(result)
      })
    }
  }
  const getNfts = (e) => {
    e.preventDefault()
    setNft(JSON.parse(e.target.value))
    let {name} =  JSON.parse(e.target.value)
    axios.get(`${apiEndpoint}/token/nft/${account}/${name}`).then(response => {
      setNfts(response.data)
      console.log(response.data)
    })
    .catch(console.log)
  }
  const onDetailsButtonClick = (e) => {
    let {tokenId} = JSON.parse(e.target.value)
    e.preventDefault()
    if(web3Context.eth){
      let web3 = web3Context
      let contractInstance = new web3.eth.Contract(nft.abi, nft.address)
      contractInstance.methods.tokenData(tokenId).call({from: account}, (error, result) => {
        if(error){
          console.log(error)
        }
        else {
          let{name, fatherName, motherName, dateOfBirth, bloodGroup} = result
          setNftContext({...nft, data: {name, fatherName, motherName, dateOfBirth, bloodGroup, tokenId}})
          history.push('/profile-page')
        }
      })
    }
  }
  return (
    <>
      {/* <ExamplesNavbar /> */}
      <IndexNavbar></IndexNavbar>
      <div className="wrapper">
        {/* <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png").default}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png").default}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png").default}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png").default}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png").default}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png").default}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
              <Col lg="6" md="6">
                <h1 className="text-white">
                  We keep your coin <br />
                  <span className="text-white">secured</span>
                </h1>
                <p className="text-white mb-3">
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart. I am alone, and feel...
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    From 9.99%/mo
                  </p>
                  <Button
                    className="btn-link"
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
                <div className="btn-wrapper">
                  <div className="button-container">
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-dribbble" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook" />
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/etherum.png").default}
                />
              </Col>
            </Row>
          </div>
        </div> */}
        <section className="section section-lg">
          <section className="section">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png").default}
            />
            <Container>
            <Row className="row-grid justify-content-between">
                    <Col className="px-2 py-2" lg="7" sm="10">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-minimal-right text-info" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                              <p className="card-category" >Connected Account</p>
                              <CardTitle tag="p">{account}</CardTitle><br></br>
                                <p />
                                <p className="card-category" >Available Balance : {balance}</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>

                    </Col>
                   
                    <Col className="px-2 py-2" lg="4" sm="12">
                    
                    <Table>
                      <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th className="text-center">Address</th>
                        <th className="text-center">Button</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        tokens.map((token, index) =><tr>
                          <td className="text-center">{index +1}</td>
                          <td>{token.name}</td>
                          <td>{token.tokenType}</td>
                          <td className="text-center">{token.address}</td>
                          <td> {token.tokenType ==='FT' &&<Button
                className="nav-link d-none d-lg-block"
                color="primary"
                target="_blank"
                value = {JSON.stringify(token)}
                onClick = {getFungibleTokenBalance}
              >
               Get Balance
              </Button>}{token.tokenType ==='NFT' &&<Button
                className="nav-link d-none d-lg-block"
                color="primary"
                target="_blank"
                value = {JSON.stringify(token)}
                onClick = {getNfts}
              >
               Get Tokens
              </Button>}</td>
                        </tr>)
                      }
                    </tbody>
                  </Table>
                    </Col>

                  </Row>
              <Row className="row-grid justify-content-between">
                <Col>
                  <Row>
                    {/* <Col className="px-2 py-2" lg="8" sm="12">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <Col md="4" xs="5">
                              <div className="icon-big text-center icon-warning">
                                <i className="tim-icons icon-coins text-white" />
                              </div>
                            </Col>
                            <Col md="8" xs="7">
                              <div className="numbers">
                                <CardTitle tag="p">5980834</CardTitle>
                                <p />
                                <p className="card-category">Available</p>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col> */}
                    
                  </Row>
                </Col>
                <Col className="mt-lg-5" md="5">
                  {/* <div className="pl-md-5">
                    <h1>
                      Large <br />
                      Achivements
                    </h1>
                    <p>
                      I should be capable of drawing a single stroke at the
                      present moment; and yet I feel that I never was a greater
                      artist than now.
                    </p>
                    <br />
                    <p>
                      When, while the lovely valley teems with vapour around me,
                      and the meridian sun strikes the upper surface of the
                      impenetrable foliage of my trees, and but a few stray.
                    </p>
                    <br />
                    <a
                      className="font-weight-bold text-info mt-5"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Show all{" "}
                      <i className="tim-icons icon-minimal-right text-info" />
                    </a>
                  </div> */}
                </Col>
              </Row>
            </Container>
          </section>
        </section>
        <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path5.png").default}
          />
          <img
            alt="..."
            className="path3"
            src={require("assets/img/path2.png").default}
          />
          <Container>
            {/* <Row className="justify-content-center">
              <Col lg="12">
                <h1 className="text-center">Your best benefit</h1>
                <Row className="row-grid justify-content-center">
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-primary">
                        <i className="tim-icons icon-money-coins" />
                      </div>
                      <h4 className="info-title">Low Commission</h4>
                      <hr className="line-primary" />
                      <p>
                        Divide details about your work into parts. Write a few
                        lines about each one. A paragraph describing a feature
                        will.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-warning">
                        <i className="tim-icons icon-chart-pie-36" />
                      </div>
                      <h4 className="info-title">High Incomes</h4>
                      <hr className="line-warning" />
                      <p>
                        Divide details about your product or agency work into
                        parts. Write a few lines about each one. A paragraph
                        describing feature will be a feature.
                      </p>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="tim-icons icon-single-02" />
                      </div>
                      <h4 className="info-title">Verified People</h4>
                      <hr className="line-success" />
                      <p>
                        Divide details about your product or agency work into
                        parts. Write a few lines about each one. A paragraph
                        describing be enough.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row> */}
          </Container>
        </section>
        <section className="section section-lg section-safe">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path5.png").default}
          />
          <Container>
          <div className="content-center">
          <Table>
                    <caption className="text-center">Table of Transactions</caption>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Name</th>
                        <th>Token Id</th>
                        <th className="text-center">Date</th>
                        <th>Button</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        nfts.map((nft, index) => <tr>
                          <td className="text-center">{index +1}</td>
                          <td>{nft.tokenName}</td>
                          <td>{nft.tokenId}</td>
                          <td className="text-center">{nft.date}</td>
                          <td><Button
                className="nav-link d-none d-lg-block"
                color="primary"
                target="_blank"
                value = {JSON.stringify(nft)}
                onClick = {onDetailsButtonClick}
              >View Details </Button></td>
                        </tr>)
                      }
                      
                    </tbody>
                  </Table>
          </div>
            {/* <Row className="row-grid justify-content-between">
              <Col md="5">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/chester-wade.jpg").default}
                />
                <Card className="card-stats bg-danger">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">100%</CardTitle>
                        <p className="card-category text-white">Safe</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats bg-info">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">573 K</CardTitle>
                        <p className="card-category text-white">
                          Satisfied customers
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-stats bg-default">
                  <CardBody>
                    <div className="justify-content-center">
                      <div className="numbers">
                        <CardTitle tag="p">10 425</CardTitle>
                        <p className="card-category text-white">Business</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <div className="px-md-5">
                  <hr className="line-success" />
                  <h3>Awesome features</h3>
                  <p>
                    The design system comes with three pre-built pages to help
                    you get started faster. You can change the text and images
                    and you're good to go.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-vector" />
                        </div>
                        <div className="ml-3">
                          <h6>Carefully crafted components</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-tap-02" />
                        </div>
                        <div className="ml-3">
                          <h6>Amazing page examples</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div className="icon icon-success mb-2">
                          <i className="tim-icons icon-single-02" />
                        </div>
                        <div className="ml-3">
                          <h6>Super friendly support team</h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row> */}
          </Container>
        </section>
        {/* <section className="section section-lg">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png").default}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png").default}
          />
          <Col md="12">
            <Card className="card-chart card-plain">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <hr className="line-info" />
                    <h5 className="card-category">Total Investments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={bigChartData.data}
                    options={bigChartData.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </section> */}
        {/* <section className="section section-lg section-coins">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path3.png").default}
          />
          <Container>
            <Row>
              <Col md="4">
                <hr className="line-info" />
                <h1>
                  Choose the coin{" "}
                  <span className="text-info">that fits your needs</span>
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/bitcoin.png").default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Light Coin</h4>
                        <span>Plan</span>
                        <hr className="line-primary" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>50 messages</ListGroupItem>
                        <ListGroupItem>100 emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="primary">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/etherum.png").default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Dark Coin</h4>
                        <span>Plan</span>
                        <hr className="line-success" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>150 messages</ListGroupItem>
                        <ListGroupItem>1000 emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="success">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-coin card-plain">
                  <CardHeader>
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/ripp.png").default}
                    />
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="text-center" md="12">
                        <h4 className="text-uppercase">Bright Coin</h4>
                        <span>Plan</span>
                        <hr className="line-info" />
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup>
                        <ListGroupItem>350 messages</ListGroupItem>
                        <ListGroupItem>10K emails</ListGroupItem>
                        <ListGroupItem>24/7 Support</ListGroupItem>
                      </ListGroup>
                    </Row>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button className="btn-simple" color="info">
                      Get plan
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </section> */}
        {/* <Footer /> */}
      </div>
    </>
  );
}
