#pragma once

#include "starlog/observation.h"
#include <vector>
#include <string>

namespace starlog {
    class ObservationLog {
        public:
            // generate default constructor
            ObservationLog() = default;

            void addObservation(const Observation& obs);

            const std::vector<Observation>& getAllObservations() const;

            std::vector<Observation> searchByName(const std::string& query) const;

            size_t size() const;

            bool empty() const;

            void clear();

        private:
            std::vector<Observation> observations_;
    };
}