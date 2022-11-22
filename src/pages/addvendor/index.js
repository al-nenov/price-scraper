import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { addVendor } from 'utils/firebase/firebase';
import { vendorExist } from 'utils/scraper/utils/vendorExist';

const AddVendorPage = () => {
  const defaultValues = {
    vendorUrl: '',
    image: '',
    name: '',
    price: '',
    stock: '',
  }

  const { control, setError, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const onSubmit = (data) => {
    // setFormData(data);
    // setShowMessage(true);
    addVendor(data)
      .then(() => reset())
      .catch((e) => {
        setError('submitError', { type: 'submit', message: e.message });
      })
    console.log(data)
    // reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <span className="p-float-label">

          <Controller
            name="vendorUrl"
            control={control}            
            rules={
              {
                validate: {
                  checkVendorExist: async (v) => {
                    const exist = await vendorExist(v)
                    return exist === false || 'This vendor already exist'
                  }
                },
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

      <div className="field">
        <span className="p-float-label">

          <Controller
            name="price"
            control={control}
            rules={
              {
                required: 'Xpath for price is required.',
              }
            }
            render={({ field, fieldState }) => (
              <InputText id={field.price} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
            )} />
          <label htmlFor="price" className={classNames({ 'p-error': errors.price })}>Price (xpath)*</label>
        </span>
        {getFormErrorMessage('price')}
      </div>

      <div className="field">
        <span className="p-float-label">

          <Controller
            name="image"
            control={control}
            render={({ field, fieldState }) => (
              <InputText id={field.image} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
            )} />
          <label htmlFor="image" className={classNames({ 'p-error': errors.image })}>Image (xpath)</label>
        </span>
        {getFormErrorMessage('image')}
      </div>

      <div className="field">
        <span className="p-float-label">

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <InputText id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.error })} />
            )} />
          <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name (xpath)</label>
        </span>
        {getFormErrorMessage('name')}
      </div>



      <div className="field">
        <span className="p-float-label">

          <Controller
            name="stock"
            control={control}
            render={({ field, fieldState }) => (
              <InputText id={field.stock} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
            )} />
          <label htmlFor="stock" className={classNames({ 'p-error': errors.stock })}>Stock (xpath)</label>
        </span>
        {getFormErrorMessage('stock')}
      </div>
      <div>
        {getFormErrorMessage('submitError')}
      </div>
      <Button type="submit" label="Submit" className="mt-2" />
    </form>
  )
}

export default AddVendorPage
