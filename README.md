# Starlog - Astronomical Observation Logger

A lightweight command-line tool for amateur astronomers to log
and search celestial observations.

## Features

- Record observations with celestial coordinates (RA/Dec)
- Store timestamped notes
- Search and filter observations
- JSON-based storage for easy data portability

## Building

Requires CMake 3.23+ and a C++17 compiler.

```bash
mkdir build && cd build

cmake ..

make
```

## Usage
```bash
# Add a new observation
./starlog add

# List all observations
./starlog list

# Search observations
./starlog search <query>
```

## Project Structure

- `src/` - Implementation files
- `include/starlog/` - Public headers
- `tests/` - Unit tests

## License

MIT