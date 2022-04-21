import Link from 'next/link'
import { Paper, Tab, Tabs, Container } from '@mui/material'

export function MainLayout({ children }) {
  let selectedTab = false

  return (
    <>
      <nav>
        <Paper>
          <Tabs
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Link href={"/campaigns"}><Tab label="Campaigns" /></Link>
            <Link href={"/partners"}><Tab label="Partners" /></Link>
            <Tab label="Assets" />
          </Tabs>
        </Paper>
      </nav>
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  )
}