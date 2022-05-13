import {FC} from "react";
import {Modal} from "../../modal";
import {cmsClient, modelsId} from "../../../lib/datocms";
import {Button} from "@mui/material";

type TemplateModalT = {
    open: boolean
    onClose: () => void
    type?: 'add' | 'edit'
}

async function createContractTemplate(formData: Record<string, any>): Promise<any> {

    const record = await cmsClient.items.create({
        itemType: modelsId.contractTemplate,
        slug: formData.slug,
        template: formData.template,
    })

    console.log('record template', record)

    return record
}

const TemplateModal: FC<TemplateModalT> = ({ onClose, open, type= 'add' }) => {


    return (
        <Modal
            open={open}
            width={802}
            onClose={onClose}
            title={`${type === 'add' ? 'Add' : 'Edit'} Contract Template`}
        >
            <Button onClick={() => createContractTemplate({ slug: 'devtest', template: JSON.stringify({ test: 'dev' }) }).then(() => onClose())}>Create template</Button>
        </Modal>
    )
}

export { TemplateModal }
