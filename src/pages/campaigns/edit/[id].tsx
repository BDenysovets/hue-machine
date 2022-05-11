import {FC, useState} from "react";
import {JSONSchema7} from "json-schema";
import {Box, Container} from "@mui/material";
import {MuiForm} from "@rjsf/material-ui";
import {NextPageContext} from "next";
import {datoCmsApiToken, request} from "../../../lib/datocms";
import {QueryListenerOptions, useQuerySubscription} from "react-datocms";
import {concatFormFields, defaultFormFields} from "../add";

type EditPageT = {
    preview: any
    params: {
        id: string
    }
} & NextPageContext

export interface DatoCMSResponse {
    allCampaigns: [{ id: string }]
}

export async function getStaticPaths() {
    const data = await request<DatoCMSResponse>({ query: `{ allCampaigns { id } }` })

    return {
        paths: data.allCampaigns.map(it => `/campaigns/edit/${it.id}`),
        fallback: true
    };
}

export async function getStaticProps({ preview, params }: EditPageT) {
    const graphqlRequest = {
        query: `
            query findOneCampaign($id: ItemIdFilter) {
              campaign(filter: { id: $id }) {
                  id
                  abi
                  title
                  address
                  ownership
                  parentContract
                  versions {
                    id
                    url
                    date
                    version
                  }
                  metadata {
                    id
                    key
                    value
                  }
                contractTemplate {
                  id
                  slug
                  template
                }
              }
            }
        `,
        preview,
        variables: {
            slug: params.id
        }
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

const Edit: FC<{ subscription: QueryListenerOptions<any, any> }> = ({ subscription }) => {
    const { data: { campaign } } = useQuerySubscription(subscription)

    const [formData, setFormData] = useState({
        title: campaign.title,
        address: campaign.address,
        ownership: campaign.ownership,
        parentContract: campaign.parentContract
    })
    const [formSchema, setFormSchema] = useState<JSONSchema7>(concatFormFields(campaign.contractTemplate.template, defaultFormFields))

    const handleChange = ({formData}) => setFormData(formData)
    const handleSubmit = ({ formData }) => {
        console.log(formData)
    }

    return (
        <Box>
            <Container maxWidth="sm">
                <MuiForm
                    schema={formSchema}
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </Container>
        </Box>
    )
}

export default Edit