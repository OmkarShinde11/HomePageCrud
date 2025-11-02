import React from 'react'
import useFaq from '../feature/Faq/useFaq'
import TableCmp from '../ui/TableCmp';
import { CircularProgress } from '@mui/material';
import DynamicCrudForm from '../ui/DynamicCrudForm';
import useCrudHandler from '../hooks/useCrudHook';
import useCreateHandaller from '../hooks/useCreateDocHook';
import useUpdateExperties from '../feature/Experties/useUpdateExperties';
import useDeleteExperties from '../feature/Experties/useDeleteExperties';
import useCreateExperties from '../feature/Experties/useCreateExperties';
import useUpdateFaq from '../feature/Faq/useUpdateFaq';
import useCreateFaq from '../feature/Faq/useCreateFaq';
import useDeleteFaq from '../feature/Faq/useDeleteFaq';
import useReorderFaq from '../feature/Faq/useReorderFaq';

const faqFields=[
  { name: "question", label: "question", type: "text", required: true },
  { name: "answer", label: "answer", type: "text", required: true },
]

export default function FaqFormPage() {
    const {isLoading,faqData=[]}=useFaq();
    const {isUpdating,updateFaq}=useUpdateFaq();
    const {isCreating,createFaq}=useCreateFaq();
    const {isDeleting,deleteFaq}=useDeleteFaq()
    const {isEdit,editData,handleEdit,handleUpdate,}=useCrudHandler(updateFaq);
    const {isCreate,handleCreate,handleCreation}=useCreateHandaller(createFaq);
    const {isReorder,reorderFaq}=useReorderFaq();

    function handleDelete(row){
      console.log(row);
      deleteFaq(row?._id);
  };
  function handleReorder(data){
    reorderFaq(data);
  }
  function handleEditExclusive(row) {
    if (isCreate) handleCreate(); // Close create form if open
    handleEdit(row);
  }

  function handleCreateExclusive() {
    if (isEdit) handleEdit({ _id: undefined }); // Close edit form if open
    handleCreate();
  }
  if(isLoading || isUpdating || isCreating || isDeleting || isReorder) return (
    <div className="flex justify-center items-center h-64">
      <CircularProgress />
    </div>
  )

  return (
    <>
    <TableCmp data={faqData} columns={['question','answer']} onDelete={handleDelete} onEdit={handleEditExclusive} onCreate={handleCreateExclusive} reOrderData={handleReorder}></TableCmp>
    {isEdit &&
    <DynamicCrudForm key="create-form" fields={faqFields} mode='edit' defaultValues={editData} onSubmit={handleUpdate}/>
    }
    {isCreate && 
    <DynamicCrudForm key="edit-form"  mode="create" fields={faqFields} onSubmit={handleCreation}/>
    }
    </>
  )
}
