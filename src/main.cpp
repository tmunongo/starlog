#include <iostream>
#include "starlog/observation.h"
#include "starlog/observation_log.h"

int main(int argc, char *argv[])
{
    std::cout << "Starlog v1.0.0 - Astronomical Observation Logger\n";

    if (argc < 2)
    {
        std::cout << "Usage: starlog <command> [options]\n";
        std::cout << "Commands:\n";
        std::cout << " add - Add a new observation\n";
        std::cout << " list - List all observations\n";
        std::cout << " search - Search observations\n";
        return 1;
    }

    std::cout << "Command: " << argv[1] << "\n";

    std::cout << "(Not implemented yet)\n";

    // Quick test of Observation class
    if (std::string(argv[1]) == "test")
    {
        starlog::ObservationLog log;
        // Add some test observations
        log.addObservation(starlog::Observation("M31 (Andromeda Galaxy)",
                                                0.7122, 41.2689,
                                                "Clear night, excellent vis"));

        log.addObservation(starlog::Observation("M42 (Orion Nebula)",
                                                5.5833, -5.3911,
                                                "Beautiful colors visible"));

        log.addObservation(starlog::Observation("Jupiter",
                                                12.5667,
                                                -3.2453,
                                                "Four moons visible"));

        std::cout << "\n--- All Observations (" << log.size() << ") ---\n";
        for (const auto &obs : log.getAllObservations())
        {
            std::cout << "\n"
                      << obs.toString();
        }
        std::cout << "\n--- Search Results for 'M' ---\n";
        auto results = log.searchByName("M");
        for (const auto &obs : results)
        {
            std::cout << "\n"
                      << obs.toString();
        }
        return 0;
    }

    return 0;
}