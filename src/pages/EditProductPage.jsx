import InputForm from "../components/InputForm.jsx";
import { useState, useEffect } from "react";
import Textarea from "../components/Textarea.jsx";
import FileUploadForm from "../components/FileUploadForm.jsx";
import { apiFetch } from "../helpers.js";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import CheckboxForm from "../components/CheckboxForm.jsx";
export default function EditProductPage() {
  const navigate = useNavigate();
  const productFields = {
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    featured: "",
  };
  const [oldProduct, setOldProduct] = useState(productFields); // Old data product
  const [form, setForm] = useState(productFields);
  const [response, setResponse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    apiFetch("/products/" + id)
      .then((data) => {
        setForm(data);
        setOldProduct(data);
      })
      .catch((error) =>
        toast.error(
          "Something went wrong, please try again later. Error :" +
            error.message,
          { removeDelay: 4000 }
        )
      );
  }, []);

  function handleEditProduct(e) {
    e.preventDefault();

    const formData = new FormData();
    if (oldProduct.name != form.name) formData.append("name", form.name);
    if (oldProduct.price != form.price) formData.append("price", form.price);
    if (oldProduct.stock != form.stock) formData.append("stock", form.stock);
    if (oldProduct.description != form.description)
      formData.append("description", form.description);
    if (oldProduct.image != form.image) formData.append("image", form.image);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if ([...formData.entries()].length < 1) {
      toast.dismiss();
      toast.error("There is no data to update yet", { removeDelay: 4000 });
      return;
    }
    toast.loading("editing a product...");
    apiFetch("/products/" + id, {
      method: "PUT",
      body: formData,
    })
      .then(() => {
        toast.dismiss();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product successfully Edited",
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
      <h2>Edit product</h2>
      <form onSubmit={handleEditProduct}>
        <FileUploadForm
          setSaveImage={handleGetImage}
          name="product_image"
          label="Upload image"
          error={response.errors?.image}
          oldImage={form.image}
        />
        <InputForm
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          label="Nama produk"
          error={response.errors?.name}
          value={form.name}
        />
        <InputForm
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          label="Stock"
          type="number"
          error={response.errors?.stock}
          value={form.stock}
        />
        <InputForm
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          label="Harga"
          type="number"
          error={response.errors?.price}
          value={form.price}
        />
        <Textarea
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          label="Description"
          placeholder="Produk ini merupakan..."
          error={response.errors?.description}
          value={form.description}
        />
        <CheckboxForm
          label="Featured product (optional)"
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          checked={form.featured}
        />
        <div className="form-product-page-action">
          <button type="reset" className="btn secondary">
            Reset form
          </button>
          <button type="submit" className="btn primary">
            Edit product
          </button>
        </div>
      </form>
    </div>
  );
}
