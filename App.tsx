import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from "react-native";
//import { API_KEY } from '@env';


const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("Istanbul");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {

    try {
      setLoading(true);
      setError("");
     const response = await fetch(`${BASE_URL}?q=${city}&appid=0205eb492c3d8276dfed9c6472c870df&units=metric`);

      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
      />
      <Button title="Get Weather" onPress={fetchWeather} />
      {loading && <ActivityIndicator size="large" color="#000" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, width: "80%", marginBottom: 10 },
  error: { color: "red", marginTop: 10 },
  weatherContainer: { marginTop: 20, alignItems: "center" },
  city: { fontSize: 20, fontWeight: "bold" },
  temp: { fontSize: 32, fontWeight: "bold" }
});

export default WeatherApp;
