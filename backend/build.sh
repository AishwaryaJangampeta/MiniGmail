#!/usr/bin/env bash

echo "🔧 Starting custom build script..."

# Define Java install path
export JAVA_HOME="/opt/render/project/java"
export PATH="$JAVA_HOME/bin:$PATH"

# Download Java 17 from a working source (Adoptium)
echo "📦 Downloading Java 17..."
curl -L -o jdk.tar.gz https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.11%2B9/OpenJDK17U-jdk_x64_linux_hotspot_17.0.11_9.tar.gz

# Extract Java
echo "📦 Extracting JDK..."
mkdir -p "$JAVA_HOME"
tar -xzf jdk.tar.gz --strip-components=1 -C "$JAVA_HOME"

# Verify Java is installed
echo "✅ Java installed at $JAVA_HOME"
java -version

# Run Maven build
echo "🚀 Running Maven build..."
./mvnw clean install

echo "✅ Build complete."
