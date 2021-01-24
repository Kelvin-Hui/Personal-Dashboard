import React from "react";

// Importing Components
import Widget from "../Util/Widget";
import GoalItem from "./GoalItem";
import GoalsForm from "./GoalsForm";

// Importing Material-UI
import { List, Typography, Divider, Fab, Zoom } from "@material-ui/core";
import { ListAlt, Add } from "@material-ui/icons";

// Importing Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleOpen } from "../../../features/AppStatusSlice";
import { toggleGoalsForm } from "../../../features/GoalsSlice";

export default function Goals() {
  const dispatch = useDispatch();
  const goalData = useSelector((state) => state.Goals.data);

  const achievedData = goalData.filter((goal) => goal.achieved === true);
  const progressData = goalData.filter((goal) => goal.achieved === false);

  //console.log("Goals");
  const [fab, setFab] = React.useState(false);

  return (
    <Widget
      title="Goals"
      icon={<ListAlt color="error" />}
      onClose={() => dispatch(toggleOpen({ app: "Goals" }))}
    >
      <List
        disablePadding
        onMouseEnter={() => setFab(true)}
        onMouseLeave={() => setFab(false)}
        style={{ height: "calc(100% - 48px)", overflow: "auto" }}
      >
        <Typography>🤔 In Progress : </Typography>
        <Divider variant="middle" style={{ height: "3px" }} />
        {progressData.map((goal) => {
          return <GoalItem goal={goal} key={goal.id} />;
        })}
        <Typography>🥳 Achieved :</Typography>
        <Divider variant="middle" style={{ height: "3px" }} />
        {achievedData.map((goal) => {
          return <GoalItem goal={goal} key={goal.id} />;
        })}

        <Zoom in={fab}>
          <Fab
            size="small"
            style={{
              position: "fixed",
              right: "10%",
              bottom: "5%",
              color: "green",
              backgroundColor: "white",
            }}
            onClick={() => dispatch(toggleGoalsForm())}
          >
            <Add />
          </Fab>
        </Zoom>

        <GoalsForm />
      </List>
    </Widget>
  );
}
