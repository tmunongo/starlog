#pragma once

#include <string>
#include <ctime>

namespace starlog {
    class Observation {
        public:
            Observation(const std::string& object_name,
            double right_ascension,
            double declination,
            const std::string& notes = "");

        // const - access only 
        const std::string& getObjectName() const;
        double getRightAscension() const;
        double getDeclination() const;
        const std::string& getNotes() const;
        std::time_t getTimestamp() const;

        std::string toString() const;

        private:
            std::string object_name_;
            double right_ascension_;
            double declination_; // in degress
            std::string notes_;
            std::time_t timestamp_; // unix timestamp
    };

}