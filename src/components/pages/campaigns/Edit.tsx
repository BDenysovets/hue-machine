import {FC, useState} from "react";
import {CampaignT} from "./List";
import {JSONSchema7} from "json-schema";
import formSchemaJson from "./formSchema.json";
import {Box} from "@mui/material";
import {MuiForm} from "@rjsf/material-ui";

type EditT = {
  onSubmit: (data: CampaignT) => void
  campaign: CampaignT
}

const Edit: FC<EditT> = ({ onSubmit, campaign }) => {
  const [data, setData] = useState<CampaignT>(campaign)
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

export { Edit }
