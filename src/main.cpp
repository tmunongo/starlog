#include <iostream>

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
    std::cout << "(Not implemented yet)\n";

    return 0;
}