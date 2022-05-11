import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Container
} from "@mui/material";
import {FC, useEffect, useState} from "react";
import { MuiForm } from "@rjsf/material-ui"
import { JSONSchema7 } from "json-schema"
import {NextPageContext} from "next";
import {datoCmsApiToken, request} from "../../lib/datocms";
import {QueryListenerOptions, useQuerySubscription} from "react-datocms";

type AddPageT = {
    preview: any
} & NextPageContext


export async function getStaticProps({ preview }: AddPageT) {
    const graphqlRequest = {
        query: `
          {
            allContractTemplates(first: 100) {
                id
                slug
                template
            }
          }
        `,
        preview,
    };

    return {
        props: {
            subscription: preview
                ? {
                    ...graphqlRequest,
                    initialData: await request(graphqlRequest),
                    token: datoCmsApiToken
                }
                : {
                    enabled: false,
                    initialData: await request(graphqlRequest)
                }
        },
        revalidate: 1
    };
}

export const defaultFormFields = {
    title: {
        type: "string",
        title: "Title"
    },
    address: {
        type: "string",
        title: "Address"
    },
    ownership: {
        type: "string",
        title: "Ownership"
    },
    parentContract: {
        type: "string",
        title: "Parent Contract"
    },
}

export function concatFormFields(template: Record<string, any>, additionalFields: Record<string, any>): JSONSchema7 {
    return {
        ...template,
        properties: {
            ...additionalFields,
            ...template.properties,
        }
    }
}

const Add: FC<{ subscription: QueryListenerOptions<any, any> }> = ({ subscription }) => {
    const { data: { allContractTemplates } } = useQuerySubscription(subscription)

    const [data, setData] = useState()
    const [contractTemplate, setContractTemplate] = useState(allContractTemplates[0])
    const [formsSchema, setFormSchema] = useState<JSONSchema7>(contractTemplate.template)

    const handleSelectChange = (event: SelectChangeEvent) => {
        setContractTemplate(allContractTemplates.find(it => it.id === event.target.value))
    }

    const handleSubmit = ({ formData }) => {
        console.log(formData)
    }

    useEffect(() => {
        setFormSchema(concatFormFields(contractTemplate.template, defaultFormFields))
    }, [contractTemplate])

    const handleChange = ({ formData }) => setData(formData)

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Typography variant={"caption"}>Select your contract template</Typography>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id="demo-simple-select-label">Select Template</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={contractTemplate.id}
                        label="Select Template"
                        onChange={handleSelectChange}
                    >
                        {allContractTemplates.map(item => (
                            <MenuItem key={item.id} sx={{ width: '100%' }} value={item.id}>{item.slug}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            <Container maxWidth="sm">
                <MuiForm
                    schema={formsSchema}
                    formData={data}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </Container>
        </Box>
    )
}

export default Add
