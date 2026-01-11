import { Trash2Icon, SquarePenIcon } from "lucide-react";
import { Link } from "react-router";
import { formatRupiah } from "../helpers.js";
export default function ProductCard(props) {
  const { type, name, image, price, stock, id, handleDelete } = props;

  return (
    <div className="product-card">
      <img className="product-img" src={image} alt={name} />
      <div className="product-details">
        <div>
          <h5 className="product-name">{name}</h5>
          <span className="product-price">{formatRupiah(price)}</span>
        </div>
        <span className="product-stock">{stock} tersisa</span>
        <div className="product-action">
          <Link to={"/products/" + id} className="btn primary">
            Lihat detail
          </Link>
          {type !== "client" && (
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
        </div>
      </div>
    </div>
  );
}
