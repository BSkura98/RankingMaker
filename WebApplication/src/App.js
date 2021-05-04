import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RankingList from "./components/RankingList";
import Ranking from "./components/Ranking";
import RankingGroupList from "./components/RankingGroupList";
import ItemList from "./components/ItemList";
import ItemStatistics from "./components/ItemStatistics";

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
        <Route
          path="/itemStatistics/:itemId"
          children={<ItemStatistics />}
        ></Route>
        <Route path="/ranking/:rankingId" children={<Ranking />}></Route>
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
