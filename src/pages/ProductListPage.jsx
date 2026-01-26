import InputForm from "../components/InputForm.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { apiFetch } from "../helpers.js";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import debounce from "lodash.debounce";
import AdminOnly from "../middlewares/AdminOnly.jsx";
import { trackEvent } from "../analytics/analytics.js";
export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function handleDeleteProduct(e, id) {
    e.preventDefault();
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "Delete product",
      text: "Are you sure you want to delete this product? This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.loading("Deleting product...");
        // Backend delete (database)
        apiFetch("/products/" + id, {
          method: "DELETE",
        })
          .then(() => {
            toast.dismiss();
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Product successfully deleted",
              showCancelButton: false,
            });
          })
          .catch(() => {
            toast.dismiss();
            toast.error("There's an error, please try again!", {
              removeDelay: 4000,
            });
          })
          .finally(() => {
            // frontend delete (update UI)
            const updatedProducts = products.filter(
              (product) => product._id !== id,
            );
            setProducts(updatedProducts);
          });
      }
    });
  }

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        apiFetch(`/products?search=${value}`)
          .then((data) => {
            setProducts(data);
            trackEvent("search", { search_term: value, results: data.length });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 500),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);
  const handleSearch = (e) => {
    setIsLoading(true);
    debouncedSearch(e.target.value);
  };
  useEffect(() => {
    apiFetch("/products")
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <Toaster />
      <div className="products-list-header">
        <div>
          <h2>List Products</h2>
          <AdminOnly>
            <Link to="/products/create" className="btn primary">
              Create new products
            </Link>
          </AdminOnly>
        </div>

        <InputForm
          placeholder="Search product by name"
          onChange={handleSearch}
        />
      </div>
      <div className="products-grid">
        {products.map((product) => {
          return (
            <ProductCard
              handleDelete={handleDeleteProduct}
              key={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
              stock={product.stock}
              id={product._id}
            />
          );
        })}
        {isLoading && <div className="loading-overlay"></div>}
      </div>
    </div>
  );
}
