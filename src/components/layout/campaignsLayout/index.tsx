import {FC} from "react";
import {Header} from "./Header";
import {Box, Container} from "@mui/material";


const CampaignsLayout: FC = ({ children }) => (
  <Box>
    <Header />
    <Container maxWidth="lg">
      {children}
    </Container>
  </Box>
)

export { CampaignsLayout }
