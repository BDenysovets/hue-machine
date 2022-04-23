import {Box} from "@mui/material";
import {FC, useState} from "react";
import Form from "@rjsf/material-ui"
import { JSONSchema7 } from "json-schema"
import formSchemaJson from './formSchema.json'


const AddForm: FC = () => {
  const [data, setData] = useState()
  const formSchema: JSONSchema7 = JSON.parse(JSON.stringify(formSchemaJson))

  const handleChange = ({formData}) => setData(formData)

  const handleSubmit = ({formData}) => {
    console.log('submit', formData)
  }

  return (
    <Box>
      <Form
        schema={formSchema}
        formData={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export { AddForm }
