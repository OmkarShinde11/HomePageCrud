import React from 'react'
import useCoreUsp from '../feature/Corr-Usp/useCoreUsp'
import { CircularProgress } from '@mui/material';
import TableCmp from '../ui/TableCmp';
import DynamicCrudForm from '../ui/DynamicCrudForm';
import useCrudHandler from '../hooks/useCrudHook';
import useCreateHandaller from '../hooks/useCreateDocHook';
import useUpdateCoreUsp from '../feature/Corr-Usp/useUpdateCoreUsp';
import useCreateCoreUsp from '../feature/Corr-Usp/useCreateCoreUsp';
import useDeleteCoreUsp from '../feature/Corr-Usp/useDeleteCoreUsp';
import useReorderCoreUsp from '../feature/Corr-Usp/useReorderCoreUsp';

const coreUspFields=[
  { name: "Image", label: "Image", type: "file", required: true },
  { name: "title", label: "title", type: "text", required: true },
  { name: "redirectLink", label: "redirectLink", type: "text"},
]

export default function CoreUspFormPage() {
    const {isLoading,coreUsp=[]}=useCoreUsp();
    const {isUpdating,updateCoreUsp}=useUpdateCoreUsp();
    const {isCreating,createCoreUsp}=useCreateCoreUsp();
    const {isDeleting,deleteCoreUsp}=useDeleteCoreUsp();
    const {isEdit,editData,handleEdit,handleUpdate,}=useCrudHandler(updateCoreUsp)
    const {isCreate,handleCreate,handleCreation}=useCreateHandaller(createCoreUsp);
    const {isReorder,reorderCoreUsp}=useReorderCoreUsp();

    function handleDelete(row){
      console.log(row);
      deleteCoreUsp(row?._id);
  };

  function handleReorder(data){
    reorderCoreUsp(data);
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
    <TableCmp data={coreUsp} columns={['Image','title','redirectLink']} onDelete={handleDelete} onEdit={handleEditExclusive} onCreate={handleCreateExclusive} reOrderData={handleReorder}></TableCmp>
    {isEdit &&
    <DynamicCrudForm key="create-form" fields={coreUspFields} mode='edit' defaultValues={editData} onSubmit={handleUpdate}/>
    }
    {isCreate && 
    <DynamicCrudForm key="edit-form"  mode="create" fields={coreUspFields} onSubmit={handleCreation}/>
    }
    </>
  )
}
