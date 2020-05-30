<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect, useState } from "react";

import api from "./services/api";
>>>>>>> 583e468050bd43c32a9fd961f7592fca3bfabafe

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
<<<<<<< HEAD
  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
=======
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((resp) => setRepositories(resp.data));
  }, []);

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/like`);

    const repos = repositories.map((repo) => {
      if (repo.id === id) repo.likes += 1;
      return repo;
    });

    setRepositories(repos);
>>>>>>> 583e468050bd43c32a9fd961f7592fca3bfabafe
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
<<<<<<< HEAD
        <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>as 1asd</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>ReactJSa</Text>
            <Text style={styles.tech}>Node.js</Text>
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
=======
        <FlatList
          data={repositories}
          keyExtractor={(repo) => repo.id}
          renderItem={({ item }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>

              <View style={styles.techsContainer}>
                {item.techs.map((tech) => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
>>>>>>> 583e468050bd43c32a9fd961f7592fca3bfabafe
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
<<<<<<< HEAD
=======
    borderRadius: 4,
>>>>>>> 583e468050bd43c32a9fd961f7592fca3bfabafe
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
<<<<<<< HEAD
=======
    textAlign: "center",
>>>>>>> 583e468050bd43c32a9fd961f7592fca3bfabafe
  },
});
