import InputForm from "../components/InputForm.jsx";
import { useRef, useState } from "react";
import Textarea from "../components/Textarea.jsx";
import FileUploadForm from "../components/FileUploadForm.jsx";
import { apiFetch } from "../helpers.js";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import CheckboxForm from "../components/CheckboxForm.jsx";
export default function CreateProductPage() {
  const formRef = useRef();
  const navigate = useNavigate();
  const productFields = {
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    featured: "",
  };

  const [form, setForm] = useState(productFields);
  const [response, setResponse] = useState({});
  function handleConfirmReset(e) {
    e.preventDefault();
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "Reset the form?",
      showCancelButton: true,
      confirmButtonText: "Yes,reset",
    }).then((result) => {
      if (result.isConfirmed) {
        formRef.current.reset();
      }
    });
  }
  function handleCreateProduct(e) {
    e.preventDefault();
    console.log(form);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("description", form.description);
    formData.append("image", form.image);
    formData.append("featured", form.featured);

    toast.loading("creating a new product...");
    apiFetch("/products", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        toast.dismiss();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Product successfully created",
          showCancelButton: true,
          confirmButtonText: "Go to product list page",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/products/lists");
          }
        });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("There's an error, please try again!", {
          removeDelay: 4000,
        });
        setResponse(err);
      });
  }
  function handleGetImage(data) {
    setForm({ ...form, image: data });
  }
  return (
    <div className="form-product-page">
      <Toaster />
      <h2>Create product</h2>
      <form ref={formRef} onSubmit={handleCreateProduct}>
        <FileUploadForm
          setSaveImage={handleGetImage}
          name="product_image"
          label="Upload image"
          error={response.errors?.image}
        />
        <InputForm
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          label="Nama produk"
          error={response.errors?.name}
        />
        <InputForm
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          label="Stock"
          type="number"
          error={response.errors?.stock}
        />
        <InputForm
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          label="Harga"
          type="number"
          error={response.errors?.price}
        />

        <Textarea
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          label="Description"
          placeholder="Produk ini merupakan..."
          error={response.errors?.description}
        />
        <CheckboxForm
          label="Featured product (optional)"
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
        />
        <div className="form-product-page-action">
          <button onClick={handleConfirmReset} className="btn secondary">
            Reset form
          </button>
          <button type="submit" className="btn primary">
            Create product
          </button>
        </div>
      </form>
    </div>
  );
}
