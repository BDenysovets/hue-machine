import {FC, useState} from 'react';
import { Modal } from '../../modal';
import {create} from '../../../lib/datocms';
import { Button, Input } from '@mui/material';

type TemplateModalT = {
  open: boolean;
  onClose: () => void;
  type?: 'add' | 'edit';
};

const TemplateModal: FC<TemplateModalT> = ({ onClose, open, type = 'add' }) => {
  const [slug, setSlug] = useState('')

  function onSubmit(formData) {
    type === 'add'
      ? create(formData, "contractTemplate").then(() => onClose())
      : create(formData, "contractTemplate").then(() => onClose())
  }

  return (
    <Modal open={open} width={802} onClose={onClose} title={`${type === 'add' ? 'Add' : 'Edit'} Contract Template`}>
      <Input placeholder={'Enter Slug'} name={'Enter Slug'} value={slug} onChange={(e) => setSlug(e.target.value)} />
      <Button
        onClick={() => onSubmit({ slug, template: JSON.stringify({ test: 'dev refactor' }) })}
      >
        Create template
      </Button>
    </Modal>
  );
};

export { TemplateModal };
