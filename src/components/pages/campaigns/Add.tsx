import {Box} from "@mui/material";
import {FC, useState} from "react";
import { MuiForm } from "@rjsf/material-ui"
import { JSONSchema7 } from "json-schema"
import formSchemaJson from './formSchema.json'
import {CampaignT} from "./List";

type AddT = {
  onSubmit: (data: CampaignT) => void
}

const Add: FC<AddT> = ({ onSubmit }) => {
  const [data, setData] = useState()
  const formSchema: JSONSchema7 = JSON.parse(JSON.stringify(formSchemaJson))

  const handleChange = ({formData}) => setData(formData)
  const handleSubmit = ({ formData}) => onSubmit(formData)

  return (
    <Box>
      <MuiForm
        schema={formSchema}
        formData={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Box>
  )
}

export { Add }
