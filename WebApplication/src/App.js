import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RankingList from "./RankingList";
import Ranking from "./Ranking";
import RankingGroupList from "./RankingGroupList";
import ItemList from "./ItemList";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RankingGroupList />
        </Route>
        <Route
          path="/rankingGroup/:rankingGroupId"
          children={<RankingList />}
        ></Route>
        <Route path="/items/:rankingGroupId" children={<ItemList />}></Route>
        <Route path="/ranking/:rankingId" children={<Ranking />}></Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
