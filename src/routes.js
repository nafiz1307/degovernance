import React,{useState} from 'react';
import { Web3Context } from 'Context/Web3Context';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Index from "views/Index.js";
import ProfilePage from "views/examples/ProfilePage.js";
import DeedPage from "views/examples/DeedPage";
import { NftContext } from 'Context/NftContext';
export default function Routes() {
    const [web3Context, setWeb3Context] = useState({})
    const [nftContext, setNftContext] = useState({})
    return(

        
            <BrowserRouter>
            <Switch>
            <NftContext.Provider value = {{nftContext, setNftContext}}>
                <Web3Context.Provider value = {{web3Context, setWeb3Context}}>
                    <Route path="/landing-page" render={(props) => <Index {...props} />} />
                    <Route
                    path="/profile-page"
                    render={(props) => <ProfilePage {...props} />}
                    />
                    <Route
                    path="/deed-page"
                    render={(props) => <DeedPage {...props} />}
                    />
                    {/* <Redirect from="/" to="/landing-page" /> */}
                </Web3Context.Provider>
            </NftContext.Provider>
            </Switch>
            </BrowserRouter>
        
    )
}