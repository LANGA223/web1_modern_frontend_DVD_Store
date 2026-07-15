import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Card className="h-100 shadow-sm border-0 product-card">
      <Link to={`/product/${product.id}`} className="text-decoration-none">
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg="secondary" className="text-uppercase">
            {product.brand}
          </Badge>
          <span className="text-warning small">
            <i className="bi bi-star-fill me-1" />
            {product.rating}
          </span>
        </div>
        <Card.Title className="h6">
          <Link to={`/product/${product.id}`} className="text-decoration-none link-dark">
            {product.name}
          </Link>
        </Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <span className="fw-bolder fs-5">{formatPrice(product.price)}</span>
          <Button
            variant={added ? 'success' : 'primary'}
            size="sm"
            onClick={handleAdd}
          >
            <i className={`bi ${added ? 'bi-check-lg' : 'bi-cart-plus'} me-1`} />
            {added ? 'Added' : 'Add'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
