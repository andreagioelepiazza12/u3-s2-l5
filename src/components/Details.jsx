import { useParams } from "react-router-dom";
import testCity from "../Data/testCity.json"
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

const Details = () => {
    const { cityName } = useParams(); 
    const [weatherDetails, setWeatherDetails] = useState(null);
    
  
    useEffect(() => {
      
      if (cityName) {
        
        setWeatherDetails(testCity);
      }
    }, [cityName]);
  
    if (!weatherDetails) return <div>Loading...</div>;
  
    return (
      <Container className="mt-4">
        <Card>
          <Card.Img
            variant="top"
            src={`http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`}
            alt="Icona meteo"
          />
          <Card.Body>
            <Card.Title>{weatherDetails.name}</Card.Title>
            <Card.Text>{weatherDetails.weather[0].description}</Card.Text>
            <Card.Text>Temp: {Math.round(weatherDetails.main.temp - 273.15)}°C</Card.Text>
            <Card.Text>Humidity: {weatherDetails.main.humidity}%</Card.Text>
            <Card.Text>Wind Speed: {weatherDetails.wind.speed} m/s</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  };

{/*
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        
        const geoResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
        );
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
          console.warn(`Città non trovata: ${cityName}`);
          return;
        }

        const { lat, lon } = geoData[0]; 

        
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();
        
        
        setWeatherDetails(weatherData);
        setLoading(false); 
      } catch (error) {
        console.error("Errore nella fetch:", error);
        setLoading(false);
      }
    };

    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName]);  
  
  
  if (loading) return (
    <Container className="mt-4 text-center">
      <Spinner animation="border" variant="primary" />
      <p>Loading weather data...</p>
    </Container>
  );

  
  if (!weatherDetails) return <div>Città non trovata o errore nella richiesta.</div>;

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <Card>
            <Card.Img
              variant="top"
              src={`http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`}
              alt="Icona meteo"
            />
            <Card.Body>
              <Card.Title>{weatherDetails.name}, {weatherDetails.sys.country}</Card.Title>
              <Card.Text>{weatherDetails.weather[0].description}</Card.Text>
              <Card.Text>Temperature: {Math.round(weatherDetails.main.temp - 273.15)}°C</Card.Text>
              <Card.Text>Feels Like: {Math.round(weatherDetails.main.feels_like - 273.15)}°C</Card.Text>
              <Card.Text>Humidity: {weatherDetails.main.humidity}%</Card.Text>
              <Card.Text>Wind Speed: {weatherDetails.wind.speed} m/s</Card.Text>
              <Card.Text>Pressure: {weatherDetails.main.pressure} hPa</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  */}
  
  export default Details;