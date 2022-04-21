import { useState } from 'react'
import Link from 'next/link'
import MUIDataTable from "mui-datatables"
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { NextPageContext } from 'next'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { MainLayout } from '../../components/layout/mainLayout'
import { Fab } from '@material-ui/core'
import { MessageBar } from '../../components/notification/messageBar'

interface Partner {
    partner: string,
    key: string
}

interface PartnerProps {
    partners: Partner[]
}

export default function Partners(props: PartnerProps) {
    const [partners, setPartners] = useState(props.partners)

    const [response, setResponse] = useState({
        type: 'success',
        message: ''
    })

    const [removePartner, setRemovePartner] = useState("")

    const removePartnerOpen = (partner: string) => {
        setRemovePartner(partner)
    };

    const removePartnerClose = () => {
        setRemovePartner("")
    };

    const removePartnerConfirm = async () => {
        try{
            const res = await fetch(`/api/partners/${removePartner}`, {
                method: 'DELETE'
            })
            
            const json = await res.json()

            if (json.success) {
                setPartners(partners.filter((item) => item.partner !== removePartner))

                setResponse({
                    type: 'success',
                    message: `Partner ${removePartner} was removed successfully.`
                })
            } else {
                setResponse({
                    type: 'error',
                    message: json.message
                })
            }
        } catch (e) {
          console.log('An error occurred', e);
          setResponse({
            type: 'error',
            message: 'An error occured while submitting the form'
          })
        }

        setRemovePartner("")
    };

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
                customBodyRender: (value: string) => {
                    return (
                        <Link href={"/partners/[partner]"} as={`/partners/${value}`}>
                            <IconButton>
                                <EditIcon/>
                            </IconButton>
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
                        <IconButton aria-label="delete" onClick={() => removePartnerOpen(value)}>
                            <DeleteIcon />
                        </IconButton>
                    )
                }
            }
        }
    ]

    const options = {
        selectableRows: "none",
        sortOrder: {
            name: "partner",
            direction: "asc"
        }
    };

    return (
        <MainLayout>
            <style jsx>{`
                .floatPanel {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                }
            `}</style>
            <div className="floatPanel">
                <Link href={"/partners/[partner]"} as={`/partners/new`}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </div>
            <Dialog
                open={!!removePartner}
                onClose={removePartnerClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You are about to remove the "{removePartner}" partner. Please confirm this action.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={removePartnerClose} color="primary">
                    No
                </Button>
                <Button onClick={removePartnerConfirm} color="primary" autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
            <Box my={4}>
                <MUIDataTable
                    title={"Partners"}
                    data={partners}
                    columns={columns}
                    options={options}
                />
            </Box>

            <MessageBar type={response.type as 'success'|'error'} message={response.message}></MessageBar>
        </MainLayout>
    )
}

export async function getServerSideProps ({ req }: NextPageContext) {
    const res = await fetch(`http://${req.headers.host}/api/partners`)
    const { data } = await res.json()
  
    return {
      props: { partners: data }
    }
}