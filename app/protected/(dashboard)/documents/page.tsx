import React from 'react';
import DocumentEdit from '../../../../components/dashboard/documents/document_edit';
export default function Documents() {
  return (
    <div className='w-full'>
      <div className='p-5'>
        <h1 className='font-semibold text-2xl'>Documentos</h1>
      </div>
        <DocumentEdit />
    </div>
  );
}