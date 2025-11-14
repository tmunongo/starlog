#include "starlog/observation_log.h"
#include <algorithm>
#include <cctype>

namespace starlog
{
    void ObservationLog::addObservation(const Observation &obs)
    {
        observations_.push_back(obs);
    }

    const std::vector<Observation> &ObservationLog::getAllObservations() const
    {
        return observations_;
    }

    std::vector<Observation> ObservationLog::searchByName(const std::string &query) const
    {
        std::vector<Observation> results;

        auto toLower = [](const std::string &str) -> std::string
        {
            std::string lower;
            lower.reserve(str.size());

            for (char c : str)
            {
                lower.push_back(std::tolower(static_cast<unsigned char>(c)));
            }
            return lower;
        };

        std::string query_lower = toLower(query);

        for (const auto &obs : observations_)
        {
            std::string name_lower = toLower(obs.getObjectName());

            if (name_lower.find(query_lower) != std::string::npos)
            {
                results.push_back(obs);
            }
        }

        return results;
    }

    size_t ObservationLog::size() const
    {
        return observations_.size();
    }

    bool ObservationLog::empty() const
    {
        return observations_.empty();
    }

    void ObservationLog::clear()
    {
        observations_.clear();
    }
}