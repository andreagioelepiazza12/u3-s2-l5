import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Index = () => {
  const apiKey = "092c1fc41cdb78e6e85c7ee299732493";
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault(); 

    if (!city) return; 

    setLoading(true); 

    try {
      
      const geoResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        alert("Città non trovata");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];

      
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const weatherData = await weatherResponse.json();

      setForecastData(weatherData.list); 
    } catch (error) {
      console.error("Errore nella fetch:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Container>
        <Form onSubmit={handleSearch} className="mb-4">
          <Form.Group controlId="formCity">
            <Form.Label>Cerca per città</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci nome città"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 w-100">
            Cerca
          </Button>
        </Form>

        {loading && <p>Caricamento in corso...</p>}

        <Row className="mt-4">
          {forecastData.length > 0 ? (
            forecastData.slice(0, 5).map((forecast, index) => (
              <Col xs={12} md={4} key={index} className="mb-4">
                <Card className="shadow-lg rounded-3 border-0 card-hover">
                  <Card.Img
                    variant="top"
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt="Icona meteo"
                  />
                  <Card.Body>
                    <Card.Title className="text-center">
                      {new Date(forecast.dt * 1000).toLocaleString()}
                    </Card.Title>
                    <Card.Text className="text-center">{forecast.weather[0].description}</Card.Text>
                    <Card.Text className="text-center">
                      Temp: {Math.round(forecast.main.temp - 273.15)}°C
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>Nessun dato disponibile</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Index;