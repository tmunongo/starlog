#include "starlog/observation.h"
#include <sstream>
#include <iomanip>

namespace starlog {
    Observation::Observation(
        const std::string& object_name,
        double right_ascension,
        double declination,
        const std::string& notes)
        : object_name_(object_name)
        , right_ascension_(right_ascension)
        , declination_(declination)
        , notes_(notes)
        , timestamp_(std::time(nullptr))
        {

        }

    const std::string& Observation::getObjectName() const {
        return object_name_;
    }

    double Observation::getRightAscension() const {
        return right_ascension_;
    }

    double Observation::getDeclination() const {
        return declination_;
    }

    std::time_t Observation::getTimestamp() const {
        return timestamp_;
    }

    std::string Observation::toString() const {
        std::ostringstream oss;

        // Format timestamp
        char time_buffer[80];
        std::strftime(time_buffer, sizeof(time_buffer),
        "%Y-%m-%d %H:%M:%S",
        std::localtime(&timestamp_));

        oss << "Object: " << object_name_ << "\n"
            << "RA: " << std::fixed << std::setprecision(4) << right_ascension_ << "h\n"
            << "Dec: " << std::showpos << declination_ << "°\n"
            << "Time: " << time_buffer << "\n";

            if (!notes_.empty()) {
                oss << "Notes: " << notes_ << "\n";
            }

            return oss.str();
    }

    void Observation::setNotes(const std::string& notes) {
        notes_ = notes;
    }
} // namespace starlog