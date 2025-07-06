#!/usr/bin/env bash

echo "🔧 Starting custom runtime script..."

# Define Java install path again
export JAVA_HOME="/opt/render/project/java"
export PATH="$JAVA_HOME/bin:$PATH"

# Download and install Java (again for runtime)
echo "📦 Downloading Java 17 for runtime..."
curl -L -o jdk.tar.gz https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jdk_x64_linux_hotspot_17.0.11_9.tar.gz

mkdir -p "$JAVA_HOME"
tar -xzf jdk.tar.gz --strip-components=1 -C "$JAVA_HOME"

echo "✅ Java installed for runtime"
java -version

# Run your Spring Boot JAR
echo "🚀 Starting backend..."
java -jar target/backend-0.0.1-SNAPSHOT.jar