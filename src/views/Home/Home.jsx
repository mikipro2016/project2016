import React from "react";
import { Grid, InputLabel } from "material-ui";

import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
  Modal,
} from "components";

import ed from "assets/img/autoteam.png";

function Home({ ...props }) {
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <ProfileCard
            avatar={ed}
            subtitle="Automation Team"
            title="Having Fun!!"
            description="We build great things!"

          />
        </ItemGrid>
      </Grid>

      
    </div>
  );
}

export default Home;
