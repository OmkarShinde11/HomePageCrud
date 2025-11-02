import React from 'react'
import useAward from '../feature/Award/useAward'
import TableCmp from '../ui/TableCmp';
import { CircularProgress } from '@mui/material';
import useUpdateAward from '../feature/Award/useUpdateAward';
import useCreateAward from '../feature/Award/useCreateAward';
import useDeleteAward from '../feature/Award/useDeleteAward';
import useCrudHandler from '../hooks/useCrudHook';
import useCreateHandaller from '../hooks/useCreateDocHook';
import DynamicCrudForm from '../ui/DynamicCrudForm';
import useReorderAward from '../feature/Award/useReorderAward';

const awardFields= [
  { name: "Image", label: "Image", type: "file", required: true },
]
export default function AwardFormPage() {
    const {isLoading,awardData=[]}=useAward();
    const {isUpdating,updateAward}=useUpdateAward();
    const {isCreating,createAward}=useCreateAward();
    const {isDeleting,deleteAward}=useDeleteAward();
    const {isEdit,editData,handleEdit,handleUpdate,}=useCrudHandler(updateAward)
    const {isCreate,handleCreate,handleCreation}=useCreateHandaller(createAward);
    const {isReorder,reorderAward}=useReorderAward();
    function handleDelete(row){
      console.log(row);
      deleteAward(row?._id);
  };

  function handleReorder(data){
    reorderAward(data);
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
    <TableCmp data={awardData} columns={['Image']} onDelete={handleDelete} onEdit={handleEditExclusive} onCreate={handleCreateExclusive} reOrderData={handleReorder}></TableCmp>
    {isEdit &&
    <DynamicCrudForm key="create-form" fields={awardFields} mode='edit' defaultValues={editData} onSubmit={handleUpdate}/>
    }
    {isCreate && 
    <DynamicCrudForm key="edit-form"  mode="create" fields={awardFields} onSubmit={handleCreation}/>
    }
    </>
  )
}
