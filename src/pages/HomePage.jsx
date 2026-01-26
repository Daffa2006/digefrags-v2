import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../helpers.js";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../components/ProductCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { StarOff } from "lucide-react";
import { formatRupiah } from "../helpers.js";
import Swal from "sweetalert2";
export default function HomePage() {
  const navigate = useNavigate();
  const [newestProducts, setNewestProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  function handleNavigateToDetailProduct(id) {
    navigate("/products/" + id);
  }
  useEffect(() => {
    apiFetch("/products?featured=true&limit=5")
      .then((data) => {
        const dataWithArea = data.map((product, index) => ({
          ...product,
          area: `area${index + 1}`, // area1, area2, area3, ...
        }));
        setFeaturedProducts(dataWithArea);

        Swal.fire({
          title: "Google Analytics Report",
          position: "top",
          customClass: {
            htmlContainer: "swal-text-small",
            confirmButton: "swal-text-small",
          },
          html: `
              <p>You can view the latest website analytics report here:</p>
              <a
                href="https://analytics.google.com/analytics/web/?hl=id#/a381828701p521431195/realtime/pages?params=_u..nav%3Dmaui"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Analytics
              </a>
            `,
          confirmButtonText: "Got it",
        });
      })
      .catch((err) =>
        toast.error(
          "Something went wrong, please try again later. Error :" + err.message,
          { removeDelay: 5000 },
        ),
      );
    apiFetch("/products?limit=4")
      .then((data) => setNewestProducts(data))
      .catch((err) =>
        toast.error(
          "Something went wrong, please try again later. Error :" + err.message,
          { removeDelay: 5000 },
        ),
      );
  }, []);
  return (
    <div className="home-page">
      <Toaster />
      <h2>Featured products</h2>
      {featuredProducts.length < 1 ? (
        <EmptyState
          icon={StarOff}
          title="No featured products yet"
          description="No products are marked as featured yet."
        />
      ) : (
        <div className="bento-grid">
          {featuredProducts.map((product) => (
            <figure
              onClick={() => handleNavigateToDetailProduct(product._id)}
              key={product._id}
              className="bento-item"
              style={{ gridArea: product.area }}
            >
              <img src={product.image} alt={product.name} />
              <figcaption>
                <h3>{product.name}</h3>
                <p>{formatRupiah(product.price)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <h2>Newest products</h2>
      {newestProducts.length < 1 ? (
        <EmptyState
          title="No products yet"
          description="This store hasn’t added any products yet. Please check back later."
        />
      ) : (
        <div className="products-grid">
          {newestProducts.map((product) => {
            return (
              <ProductCard
                key={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
                stock={product.stock}
                id={product._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
