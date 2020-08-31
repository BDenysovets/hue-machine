import Link from 'next/link'
import Container from '@material-ui/core/Container'
import { Paper, Tab, Tabs } from '@material-ui/core'

export function MainLayout({ children }) {
    const selectedTab = false
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