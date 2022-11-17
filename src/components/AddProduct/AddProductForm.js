
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from 'primereact/button';

const AddProductForm = () => {
  const [show, setShow] = useState(true)
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "linksArray"
  });
  const watchFieldArray = watch("linksArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });
  const onSubmit = (data) => {
    axios.post('/api/addProduct', data)
  }


  return (
    <>
      <Button label="Show" icon="pi pi-external-link" onClick={() => setShow(!show)} />
      <Dialog header="Header" visible={show} breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '70vw' }} /*footer={renderFooter(setShow)}*/ onHide={() => setShow(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText {...register("name")} placeholder="Name" />
          {controlledFields.map((field, index) => {
            // console.log(field)
            return (
              <div key={index} className="fields">
                <div className="p-inputgroup">
                  <InputText placeholder='URL' {...register(`linksArray.${index}.url`, { required: "This input is required." })} />
                  <InputText placeholder='Xpath (optional)' {...register(`linksArray.${index}.xpath`)} />
                </div>
                {index > 0 && <Button type="button" icon="pi pi-times" className="p-button-sm p-button-rounded p-button-danger " aria-label="Cancel" onClick={() => remove(index)} />}
                <ErrorMessage errors={errors} name={`linksArray.${index}.url`} render={({message}) => message}/>
              </div>
            )
          }
          )}
          <Button type="button" icon="pi pi-plus" className="p-button-rounded p-button-success" aria-label="Append"
            onClick={() =>
              append([{
                url: '',
                xpath: '',
              }])
            }
          />
          <Button label="Submit" icon="pi pi-check" type="submit" />
        </form>
      </Dialog>
    </>
  )
}

export default AddProductForm
