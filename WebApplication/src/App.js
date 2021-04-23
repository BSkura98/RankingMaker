import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RankingList from "./RankingList";
import Ranking from "./Ranking";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RankingList />
        </Route>
        <Route path="/ranking/:rankingId" children={<Ranking />}></Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
