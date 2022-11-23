
import { InputText } from 'primereact/inputtext';
import { useRef, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { vendorExist } from 'utils/scraper/utils/vendorExist';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router';
import { updateProduct } from 'utils/firebase/firebase';

const AddItemToProductForm = ({ product }) => {
  const toast = useRef(null);
  const router = useRouter()
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();

  const showConfirm = (url) => {
    toast.current.show({
      severity: 'warn', sticky: true, content: (
        <div className="flex flex-column" style={{ flex: '1' }}>
          <div className="text-center">
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
            <h4>This Vendor is not in the list</h4>
            <p>Press &apos;Add New Vendor&apos; to create it</p>
          </div>
          <div className="grid p-fluid">
            <div className="col-12">
              <Button type="button" label="Add New Vendor" className="p-button-success" onClick={() => router.push({ pathname: '/addvendor', query: { url } })} />
            </div>
          </div>
        </div>
      )
    });
  }

  const onSubmit = async (data) => {
    const exist = await vendorExist(data.vendorUrl)
    if (!exist) {
      showConfirm(data.vendorUrl)
    } else {
      updateProduct(product.id, {
        ...product,
        links: [...product.links, { url: data.vendorUrl }]
      })
    }
  }
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  return (
    <>
      <Toast ref={toast} position="center" />

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="field">
          <span className="p-float-label">

            <Controller
              name="vendorUrl"
              control={control}
              rules={
                {
                  required: 'Vendor URL is required.',
                  pattern: {
                    value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                    message: 'Invalid URL'
                  }
                }
              }
              render={({ field, fieldState }) => (
                <InputText id={field.vendorUrl} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.error })} />
              )} />
            <label htmlFor="vendorUrl" className={classNames({ 'p-error': errors.vendorUrl })}>Vendor URL*</label>
          </span>
          {getFormErrorMessage('vendorUrl')}
        </div>
        <Button label="Submit" icon="pi pi-check" type="submit" />
      </form>
    </>
  )
}

export default AddItemToProductForm
