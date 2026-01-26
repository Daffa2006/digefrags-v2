import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { apiFetch } from "../helpers.js";
import { useNavigate } from "react-router";
import AdminOnly from "../middlewares/AdminOnly.jsx";
import { Minus, Phone, Plus } from "lucide-react";
import ClientOnly from "../middlewares/ClientOnly.jsx";
export default function AdminDetailProductPage() {
  const navigate = useNavigate();
  const productFields = {
    name: "",
    price: "",
    stock: "",
    description: "",
    savedImage: "",
  };
  const [product, setProduct] = useState(productFields);
  const [amount, setAmount] = useState(1);
  const { id } = useParams();

  async function handleDeleteProduct(e, id) {
    e.preventDefault();
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "Delete product",
      text: "Are you sure you want to delete this product? This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes,delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.loading("Deleting product...");
        apiFetch("/products/" + id, {
          method: "DELETE",
        })
          .then(async () => {
            toast.dismiss();
            await Swal.fire({
              position: "top",
              icon: "Product successfully deleted",
              title:
                "Product deleted successfully. Returning to Products page...",
              timer: 4000,
              timerProgressBar: true,
              showCancelButton: false,
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/products/lists");
              }
            });
            navigate("/products/lists");
          })
          .catch(() => {
            toast.dismiss();
            toast.error("There's an error, please try again!", {
              removeDelay: 4000,
            });
          });
      }
    });
  }

  useEffect(() => {
    apiFetch("/products/" + id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) =>
        toast.error(
          "Something went wrong, please try again later. Error :" +
            error.message,
          { removeDelay: 4000 },
        ),
      );
  }, []);

  return (
    <div className="detail-product-page">
      <Toaster />
      <img src={product.image} alt={product.image} />
      <div className="product-main">
        <h2>{product.name}</h2>
        <div className="product-information">
          <div>
            <span>Stock</span>
            <span></span>
            <span>{product.stock}</span>
          </div>
          <div>
            <span>Price</span>
            <span></span>
            <span>{product.price}</span>
          </div>
          <div>
            <span>Featured</span>
            <span></span>
            <span>{product.featured ? "Yes" : "No"}</span>
          </div>
        </div>

        <div>
          <span>Description</span>
          <p>{product.description}</p>
        </div>
        <ClientOnly>
          <div className="product-purchase">
            <div className="product-amount-action">
              <button
                type="button"
                className="btn"
                onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
              >
                <Minus />
              </button>
              <input
                type="number"
                max="9"
                value={amount}
                onChange={(e) => {
                  // biarkan user mengetik, simpan apa adanya
                  setAmount(e.target.value);
                }}
                onBlur={() => {
                  // validasi saat focus hilang
                  let val = Number(amount);
                  if (isNaN(val) || val < 1) val = 1;
                  if (val > product.stock) val = product.stock;
                  setAmount(String(val));
                }}
              />
              <button
                type="button"
                className="btn"
                onClick={() =>
                  setAmount((prev) => Math.min(prev + 1, product.stock))
                }
              >
                <Plus />
              </button>
            </div>
            <button
              onClick={() => alert("Demo pembelian")}
              className="btn primary"
            >
              Buy <Phone />
            </button>
          </div>
        </ClientOnly>
        <AdminOnly>
          <div className="action">
            <a
              href="#"
              onClick={(e) => handleDeleteProduct(e, id)}
              className="btn delete"
            >
              Delete
            </a>
            <Link to={"/products/edit/" + id} className="btn edit">
              Edit
            </Link>
          </div>
        </AdminOnly>
      </div>
    </div>
  );
}
