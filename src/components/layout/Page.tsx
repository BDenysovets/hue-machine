import {FC} from "react";
import {Button, Container, Stack, Typography} from "@mui/material";
import Link from "next/link";
import {Add as AddIcon} from "@mui/icons-material";

type PageWrapperT = {
  title?: string
  link?: {
    text?: string
    href?: string
  }
}

const PageWrapper: FC<PageWrapperT> = ({ children, title, link }) => (
  <Stack gap={2} sx={{ height: 500 }}>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={4}>
      {title && <Typography variant={'h5'}>{title}</Typography>}
      {link && (
        <Link href={link.href}>
          <Button variant='contained' size='large' startIcon={<AddIcon />}>
            {link.text}
          </Button>
        </Link>
      )}
    </Stack>
    <Container maxWidth={'lg'}>
      {children}
    </Container>
  </Stack>
)

export { PageWrapper }
