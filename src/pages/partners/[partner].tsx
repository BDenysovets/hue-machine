import { useState } from 'react'
import Form from "@rjsf/material-ui"
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fab from '@material-ui/core/Fab'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import { JSONSchema7 } from "json-schema"
import partnerConfig from './partner_config.json'
import formSchemaJson from './form_schema.json'
import { NextPageContext } from 'next'
import { Partner } from '../../utils/interfaces'
import { MainLayout } from '../../components/mainLayout'
import { MessageBar } from '../../components/messageBar'


export default function PartnerPage({ partnerProp }: { partnerProp?: Partner}) {

  const [partner, setPartner] = useState({
    name: partnerProp ? partnerProp.name : '',
    absynthKey: partnerProp ? partnerProp.absynthKey : '',
    customizations: partnerProp ? partnerProp.customizations : partnerConfig
  })

  const [response, setResponse] = useState({
    type: 'success',
    message: ''
  })

  const [importExportDialog, setImportExportDialog] = useState({
    content: '',
    open: false
  })

  const openImportExportDialog = () => {
    setImportExportDialog({content: JSON.stringify(partner), open: true})
  }

  const closemportExportDialog = () => {
    setImportExportDialog({content: '', open: false})
  }

  const handleImportExportDialogChange = (event: { target: { name: any, value: any } }) => {
    setImportExportDialog({...importExportDialog, [event.target.name]: event.target.value})
  }

  const applyJSON = () => {
    let newContent: any
    try{
      newContent = JSON.parse(importExportDialog.content)
      setPartner(newContent)
      closemportExportDialog()
    }catch(e){
      setResponse({
        type: 'error',
        message: "JSON can't be recognized"
      })
    }
  }

  const formSchema: JSONSchema7 = JSON.parse(JSON.stringify(formSchemaJson))

  const handleChange = ({formData}) => {
    setPartner(formData)
  }

  const handleSubmit = async ({formData}) => {
    try {
      let url = '/api/partners', method = 'POST'
      
      if (partnerProp) {
        url += `/${partnerProp.name}`
        method = 'PUT'
      }

      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      })

      const json = await res.json()

      if (json.success) {
        setResponse({
          type: 'success',
          message: `Partner ${formData.name} was ${partnerProp ? 'updated' : 'added'} successfully.`
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
  }

  return (
    <MainLayout>
      <Container maxWidth="sm">
        <style jsx>{`
          .floatPanel {
            position: fixed;
            bottom: 30px;
            right: 30px;
          }
        `}</style>
        <div className="floatPanel">
          <Fab variant="extended" onClick={openImportExportDialog}>
            <ImportExportIcon />
            Import/Export
          </Fab>
        </div>
      
        <Dialog open={importExportDialog.open} maxWidth="xl" fullWidth
          onClose={closemportExportDialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Import/Export</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              name="content"
              label="JSON"
              type="text"
              value={importExportDialog.content}
              onChange={handleImportExportDialogChange}
              fullWidth
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closemportExportDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={applyJSON} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>

        <MessageBar type={response.type as 'success'|'error'} message={response.message}></MessageBar>

        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
            {partnerProp ? partnerProp.name : "New Partner"}
            </Typography>
            <Form schema={formSchema}
                formData={partner}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Box>
      </Container>
    </MainLayout>
  )
}

export const getServerSideProps = async ({ req, query }: NextPageContext) => {
  let partnerProp: any = null;

  if (query.partner !== "new"){
    const res = await fetch(`http://${req.headers.host}/api/partners/${query.partner}`)
    const resJson = await res.json()
    partnerProp = resJson.data
  }

  return { 
    props: { partnerProp }
  }
}