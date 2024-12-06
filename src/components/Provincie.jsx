import {useState, useEffect} from "react";
import axios from "axios";
import cities from "../Data/cities.json";
import testCity from "../Data/testCity.json"
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Provincie = () => {
    
    const apiKey = "092c1fc41cdb78e6e85c7ee299732493";

    const [weatherData, setWeatherData] = useState([]); 
    const [images, setImages] = useState({});
    const pexelsApiKey = "MvoKh5uODA3vSvClMIpJl69Vq6aZfEGFqKwvYPGYUwVNrKOiczkxC9Ic";

    
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const data = await Promise.all(
            cities.map(async (city) => {
              
              const geoResponse = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city.citta}&appid=${apiKey}`
              );
              const geoData = await geoResponse.json();
  
              if (geoData.length === 0) {
                console.warn(`Città non trovata: ${city}`);
                return null;
              }
  
              const { lat, lon, name } = geoData[0];
  
              
              const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
              );
              const weather = await weatherResponse.json();
  
              return {
                city: name,
                description: weather.weather[0].description,
                temperature: weather.main.temp,
                icon: weather.weather[0].icon,
              };
            })
          );
  
          
          setWeatherData(data.filter((item) => item !== null));
        } catch (error) {
          console.error("Errore nella fetch:", error);
        }
      };
  
      fetchWeatherData();
    }, [apiKey]);
  
    

    return (
        <Container className="mt-4">
          <Row>
            {weatherData.map((data, index) => (
              <Col xs={12} md={4} key={index} className="mb-4">
                <Link to={`/details/${data.city}`} style={{ textDecoration: "none" }}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                      alt="Icona meteo"
                    />
                    <Card.Body>
                      <Card.Title>{data.city}</Card.Title>
                      <Card.Text>{data.description}</Card.Text>
                      <Card.Text>Temp: {Math.round(data.temperature - 273.15)}°C</Card.Text> 
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      );
    

    
        
   /*   
    useEffect(() => {
        const fetchWeatherData = async () => {
          try {
            const data = await Promise.all(
              cities.map(async (city) => {
                // Usa il dato di testCity per ogni città
                const weather = testCity;
      
                // Fetch immagine per la città da Pexels
                const imageUrl = await fetchCityImage(city.name);
      
                return {
                  city: weather.name,
                  description: weather.weather[0].description,
                  temperature: weather.main.temp,
                  icon: weather.weather[0].icon,
                  imageUrl, // Aggiungi l'URL dell'immagine alla città
                };
              })
            );
      
            setWeatherData(data);
          } catch (error) {
            console.error("Errore nella fetch:", error);
          }
        };
    
        // Funzione per ottenere l'immagine della città
        const fetchCityImage = async (cityName) => {
            try {
              const response = await axios.get(`https://api.pexels.com/v1/search?query=${cityName}&per_page=10&page=1`, {
                headers: {
                  Authorization: `MvoKh5uODA3vSvClMIpJl69Vq6aZfEGFqKwvYPGYUwVNrKOiczkxC9Ic`, 
                },
              });
          
              if (response.data.photos && response.data.photos.length > 0) {
                return response.data.photos[0].src.original; // Restituisce l'URL dell'immagine
              }
              return ""; // Se nessuna immagine trovata, restituisce una stringa vuota
            } catch (error) {
              console.error("Errore nel caricamento dell'immagine:", error);
              return "";
            }
          };
    
        fetchWeatherData();
      }, []);
    
      return (
        <Container className="mt-4">
          <Row>
            {weatherData.length === 0 ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              weatherData.map((data, index) => (
                <Col xs={12} md={4} key={index} className="mb-4">
                  <Card className="shadow-lg border-light rounded h-100">
                    <Card.Img
                      variant="top"
                      src={data.imageUrl || `http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                      alt="Icona meteo"
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }} // Imposta uno stile per l'immagine
                    />
                    <Card.Body className="text-center">
                      <Card.Title className="text-uppercase font-weight-bold">
                        {data.city}
                      </Card.Title>
                      <Card.Text>{data.description}</Card.Text>
                      <Card.Text>
                        Temp: {Math.round(data.temperature - 273.15)}°C
                      </Card.Text>
                      <Link to={`/details/${data.city}`} className="btn btn-primary mt-3">
                        Vedi Dettagli
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      );

      */
 
  };
    

export default Provincie;