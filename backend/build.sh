#!/usr/bin/env bash

echo "🔧 Starting custom build script..."

# Define Java 17 install location
export JAVA_HOME="/opt/render/project/java"
export PATH="$JAVA_HOME/bin:$PATH"

# Download and install Java 17
echo "📦 Downloading and installing Java 17..."
curl -L -o jdk.tar.gz https://download.java.net/java/GA/jdk17/0d1cfde4252546c6931946de8db48ee2/35/GPL/openjdk-17_linux-x64_bin.tar.gz

mkdir -p "$JAVA_HOME"
tar -xzf jdk.tar.gz --strip-components=1 -C "$JAVA_HOME"

echo "✅ Java installed at $JAVA_HOME"
java -version

# Run Maven Wrapper to build the project
echo "🚀 Running Maven build..."
./mvnw clean install

echo "✅ Build complete."
