cmake_minimum_required(VERSION 3.23)
project(Starlog VERSION 1.0.0 LANGUAGES CXX)

# C++17 standard, required
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Compiler warnings
if (CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang")
    add_compile_options(-Wall -Wextra -pedantic)
endif()

# Include directories
include_directories(${PROJECT_SOURCE_DIR}/include)

# Main executable
add_executable(starlog 
    src/main.cpp
    src/observation.cpp
    src/observation_log.cpp
)