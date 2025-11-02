import { useRef, useState } from "react";

export default function useCrudHandler(updateMutation) {
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const docId = useRef();

  const handleEdit = (row) => {
    if(row._id==undefined){
      setIsEdit(false);
      docId.current=undefined;
      return;
    }
    if (row._id === docId.current) {
      setIsEdit(false);
      docId.current = undefined;
      return;
    }
    setEditData(row);
    docId.current = row._id;
    setIsEdit(true);
  };

  const handleUpdate = (data) => {
    updateMutation(
      { id: docId.current, data },
      {
        onSuccess: () => {
          setIsEdit(false);
          docId.current = undefined;
        },
      }
    );
  };

  return {
    isEdit,
    editData,
    handleEdit,
    handleUpdate,
  };
}
