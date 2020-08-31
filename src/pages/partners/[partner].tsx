import { useState } from 'react'
import Form from "@rjsf/material-ui"
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { JSONSchema7 } from "json-schema"
import partnerConfig from './partner_config.json'
import formSchemaJson from './form_schema.json'
import { NextPageContext } from 'next'
import { Partner } from '../../utils/interfaces'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function PartnerPage({ partnerProp }: { partnerProp?: Partner}) {

  const [partner, setPartner] = useState({
    name: partnerProp ? partnerProp.name : '',
    absynthKey: partnerProp ? partnerProp.absynthKey : '',
    customizations: partnerProp ? partnerProp.customizations : partnerConfig
  })

  const [response, setResponse] = useState({
    type: '',
    message: '',
    open: false
  })

  const formSchema: JSONSchema7 = JSON.parse(JSON.stringify(formSchemaJson))

  const uiSchema = {
    "hair_colors": {
        "items":{
            "ui:widget": "checkboxes"
        }
      }
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
          message: `Partner ${formData.name} was ${partnerProp ? 'updated' : 'added'} successfully.`,
          open: true
        })
      } else {
        setResponse({
          type: 'error',
          message: json.message,
          open: true
        })
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'An error occured while submitting the form',
        open: true
      })
    }
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setResponse({
        type: '',
        message: '',
        open: false
      })
  }

  return (
    <Container maxWidth="sm">
        <Snackbar open={response.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={response.type as 'success'|'error'}>
            {response.message}
            </Alert>
        </Snackbar>
        <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
            {partnerProp ? partnerProp.name : "New Partner"}
            </Typography>
            <Form schema={formSchema}
                uiSchema={uiSchema}
                formData={partner}
                onSubmit={handleSubmit}
            />
        </Box>
    </Container>
  )
}

PartnerPage.getInitialProps = async ({ req, query }: NextPageContext) => {
  let partnerProp: any;

  if (query.partner !== "new"){
    const res = await fetch(`http://${req.headers.host}/api/partners/${query.partner}`)
    const resJson = await res.json()
    partnerProp = resJson.data
  }

  return { 
    partnerProp
  }
}