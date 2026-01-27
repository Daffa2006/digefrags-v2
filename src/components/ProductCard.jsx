import { Trash2Icon, SquarePenIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { formatRupiah } from "../helpers.js";
import AdminOnly from "../middlewares/AdminOnly.jsx";

export default function ProductCard(props) {
  const { name, image, price, stock, id, handleDelete } = props;
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="product-card">
      <img className="product-img" src={image} alt={name} />
      <div className="product-details">
        <h5 className="product-name">{name}</h5>

        <div>
          <span className="product-price">{formatRupiah(price)}</span>
          <span className="product-stock">{stock} tersisa</span>
        </div>
        <div className="product-action">
          <Link to={"/products/" + id} className="btn primary">
            Lihat detail
          </Link>
          <AdminOnly>
            {!isHome && (
              <div>
                <a
                  href="#"
                  onClick={(e) => handleDelete(e, id)}
                  className="product-delete"
                >
                  <Trash2Icon />
                </a>
                <Link to={"/products/edit/" + id} className="product-edit">
                  <SquarePenIcon />
                </Link>
              </div>
            )}
          </AdminOnly>
        </div>
      </div>
    </div>
  );
}
