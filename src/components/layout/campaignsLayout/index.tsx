import {FC} from "react";
import {Header} from "./Header";
import {Box, Container} from "@mui/material";


const CampaignsLayout: FC = ({ children }) => (
  <Box>
    <Header />
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      {children}
    </Container>
  </Box>
)

export { CampaignsLayout }
