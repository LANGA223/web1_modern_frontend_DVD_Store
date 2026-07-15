import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProductCard from '../components/ProductCard';
import products, { CATEGORIES } from '../data/products';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const query = (searchParams.get('q') || '').toLowerCase().trim();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const setCategory = (key) => {
    const next = new URLSearchParams(searchParams);
    if (key === 'all') next.delete('category');
    else next.set('category', key);
    setSearchParams(next);
  };

  return (
    <main className="flex-shrink-0">
      <section className="py-5">
        <Container className="px-4 px-md-5">
          <div className="text-center mb-5">
            <h1 className="fw-bolder">All products</h1>
            <p className="lead fw-normal text-muted mb-0">
              Browse our full range of gaming gear, laptops, and accessories.
            </p>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <Button
              size="sm"
              variant={category === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => setCategory('all')}
            >
              All
            </Button>
            {CATEGORIES.map((c) => (
              <Button
                key={c.key}
                size="sm"
                variant={category === c.key ? 'primary' : 'outline-primary'}
                onClick={() => setCategory(c.key)}
              >
                {c.label}
              </Button>
            ))}
          </div>

          {query && (
            <p className="text-center text-muted">
              Showing results for <strong>&ldquo;{searchParams.get('q')}&rdquo;</strong> ·{' '}
              <Link to={category === 'all' ? '/products' : `/products?category=${category}`}>
                clear search
              </Link>
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-search fs-1 text-muted d-block mb-3" />
              <h4 className="fw-bold">No products found</h4>
              <p className="text-muted">Try a different category or search term.</p>
              <Button as={Link} to="/products" variant="primary">
                View all products
              </Button>
            </div>
          ) : (
            <Row className="gx-4 gy-4">
              {filtered.map((p) => (
                <Col key={p.id} sm={6} lg={4} xl={3}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </main>
  );
}
