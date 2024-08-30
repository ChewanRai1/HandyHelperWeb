import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { getFavoritesApi, removeFavoriteApi } from "../../apis/api";
import { toast } from "react-hot-toast";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavoritesApi();
        if (response.status === 200) {
          setFavorites(response.data.favorites);
        } else {
          toast.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const response = await removeFavoriteApi(favoriteId);
      if (response.status === 200) {
        setFavorites(
          favorites.filter((favorite) => favorite._id !== favoriteId)
        );
        toast.success("Service removed from favorites");
      } else {
        toast.error("Failed to remove service from favorites");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove service from favorites");
    }
  };

  if (loading) {
    return <p>Loading your favorite services...</p>;
  }

  if (favorites.length === 0) {
    return <p>You have no favorite services yet.</p>;
  }

  return (
    <Container fluid="md">
      {" "}
      {/* Fluid Container for responsive behavior */}
      <h2 className="my-4 text-center">Your Favorite Services</h2>
      <Row className="g-4 justify-content-center">
        {" "}
        {/* Justify content to center */}
        {favorites.map((favorite) => {
          const service = favorite.serviceId;
          return (
            <Col md={4} key={service._id}>
              <Card className="shadow-sm h-100">
                {" "}
                {/* h-100 ensures equal height */}
                <Card.Img
                  variant="top"
                  src={
                    service.serviceImage
                      ? `http://localhost:9000/uploads/${service.serviceImage}`
                      : "/path/to/default-image.png"
                  }
                  alt={service.serviceName || "Service Image"}
                />
                <Card.Body className="d-flex flex-column">
                  {" "}
                  {/* Flex column layout */}
                  <Card.Title>{service.serviceName}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> NPR {service.servicePrice}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFavorite(favorite._id)}
                    className="mt-auto" // Pushes the button to the bottom
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
