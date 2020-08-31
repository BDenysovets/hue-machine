import Link from 'next/link'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

export default function Home() {

  return (
    <Container>
            <Box my={4}>
              <Link href="/partners">
                <a>Partners page is here (click me)</a>
              </Link>
            </Box>
    </Container>
  );
}
