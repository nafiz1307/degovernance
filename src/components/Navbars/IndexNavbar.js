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
import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import Web3 from 'web3';
// reactstrap components
import {
  Button,
  Collapse,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  // NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Web3Context } from "Context/Web3Context";

export default function IndexNavbar() {
  const {web3Context, setWeb3Context} = useContext(Web3Context)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(null)
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  let {ethereum, web3} = window
  ethereum.on('accountsChanged', (accounts) => {
    console.log(accounts)
    setAccount(accounts[0])
  })
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  },[]);
  const connectMetamask = () => {
    ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
      setAccount(accounts[0])
      web3 = new Web3(ethereum)
      setWeb3Context(web3)
      web3.eth.getAccounts().then(accounts => web3.eth.getBalance(accounts[0]).then(balance => setBalance(balance)))
      console.log(accounts)
    });
  }
  
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  // const scrollToDownload = () => {
  //   document
  //     .getElementById("download-section")
  //     .scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>De Governance • </span>
            Decentralized Government
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Nafiz Zaman
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              {/* <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink> */}
            </NavItem>
            <NavItem className="p-0">
              {/* <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink> */}
            </NavItem>
            <NavItem className="p-0">
              {/* <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink> */}
            </NavItem>
            <UncontrolledDropdown nav>
              {/* <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Getting started
              </DropdownToggle> */}
              {/* <DropdownMenu className="dropdown-with-icons">
                <DropdownItem href="https://demos.creative-tim.com/blk-design-system-react/#/documentation/overview">
                  <i className="tim-icons icon-paper" />
                  Documentation
                </DropdownItem>
                <DropdownItem tag={Link} to="/register-page">
                  <i className="tim-icons icon-bullet-list-67" />
                  Register Page
                </DropdownItem>
                <DropdownItem tag={Link} to="/landing-page">
                  <i className="tim-icons icon-image-02" />
                  Landing Page
                </DropdownItem>
                <DropdownItem tag={Link} to="/profile-page">
                  <i className="tim-icons icon-single-02" />
                  Profile Page
                </DropdownItem>
              </DropdownMenu> */}
            </UncontrolledDropdown>
            <NavItem>
              {
                !account && <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                target="_blank"
                onClick = {connectMetamask}
              >
                <i className="tim-icons icon-spaceship" /> Connect to Metamask
              </Button>
              }
              {
                account && <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                target="_blank"
              >
                <i className="tim-icons icon-spaceship" /> Connected to Metamask
              </Button>
              }
            </NavItem>
            <NavItem>
              {/* <Button
                className="nav-link d-none d-lg-block"
                color="default"
                onClick={scrollToDownload}
              >
                <i className="tim-icons icon-cloud-download-93" /> Download
              </Button> */}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
