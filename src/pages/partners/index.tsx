import { useRouter } from 'next/router'
import Link from 'next/link'
import MUIDataTable from "mui-datatables"
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { NextPageContext } from 'next'

interface Partner {
    partner: string,
    key: string
}

interface PartnerProps {
    partners: Partner[]
}

export default function Partners(props: PartnerProps) {
    const router = useRouter()

    const columns = [
        {
            label: "Partner (subdomain)",
            name: "partner",
            options: {
                filter: true,
                sort: true
            }
        }, 
        {
            label: "Absynth Key",
            name: "key",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            label: " ",
            name: "partner",
            options: {
                filter: false,
                sort: false,
                customHeadLabelRender: () => {
                    return (
                        <Link href={"/partners/[partner]"} as={`/partners/new`}>
                            <AddCircleOutlineIcon/>
                        </Link>
                    )
                },
                customBodyRender: (value: string) => {
                    return (
                        <Link href={"/partners/[partner]"} as={`/partners/${value}`}>
                            <EditIcon/>
                        </Link>
                    )
                }
            }
        },
        {
            label: " ",
            name: "partner",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value: string) => {
                    return (
                        <DeleteForeverIcon/>
                    )
                }
            }
        }
    ]

    const data = props.partners

    const options = {
        selectableRows: "none",
        sortOrder: {
            name: "partner",
            direction: "asc"
        }
    };

    return (
        <Container>
            <Box my={4}>
                <MUIDataTable
                    title={"Partners"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Box>
        </Container>
    )
}

export async function getServerSideProps ({ req }: NextPageContext) {
    const res = await fetch(`http://${req.headers.host}/api/partners`)
    const { data } = await res.json()
  
    return {
      props: { partners: data }
    }
}