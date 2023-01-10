#include <iostream>
#include "starlog/observation.h"

int main(int argc, char* argv[]) {
    std::cout << "Starlog v1.0.0 - Astronomical Observation Logger\n";

    if (argc < 2) {
        std::cout << "Usage: starlog <command> [options]\n";
        std::cout << "Commands:\n";
        std::cout << " add - Add a new observation\n";
        std::cout << " list - List all observations\n";
        std::cout << " search - Search observations\n";
        return 1;
    }

    std::cout << "Command: " << argv[1] << "\n";

    // quick observation calss test
    if (std::string(argv[1]) == "test") {
        starlog::Observation obs("M31 (Andromeda Galaxy)",
                                  0.7122, // RA in hours
                                  41.2689, // Dec in degrees
                                  "Clear night, excellent visibility");

        std::cout << "\n--- Test Observation ---\n";
        std::cout << obs.toString();

        return 0;
    }
    
    std::cout << "(Not implemented yet)\n";

    return 0;
}