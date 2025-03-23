export const defaultParserConfig = {
    version: "1.0.0",
    name: "Default Resume Parser",
    description: "General purpose resume parser configuration",
    sections: {
        contact: {
            priority: 1,
            fields: ["name", "email", "phone", "location", "website", "linkedin"],
        },
        summary: {
            priority: 2,
            maxLength: 500,
        },
        experience: {
            priority: 3,
            fields: ["company", "position", "date", "location", "description"],
            dateFormat: "MMM YYYY - MMM YYYY",
        },
        education: {
            priority: 4,
            fields: ["institution", "degree", "date", "location", "gpa"],
            dateFormat: "YYYY - YYYY",
        },
        skills: {
            priority: 5,
            grouping: true,
            categories: ["Technical", "Soft", "Languages", "Tools"],
        },
        projects: {
            priority: 6,
            fields: ["name", "description", "technologies", "link", "date"],
        },
        certifications: {
            priority: 7,
            fields: ["name", "issuer", "date", "id"],
        },
        languages: {
            priority: 8,
            fields: ["language", "proficiency"],
        },
    },
    extraction: {
        useOCR: true,
        confidenceThreshold: 0.7,
        fuzzyMatching: true,
    },
    output: {
        format: "json",
        includeRawText: false,
        includeConfidenceScores: false,
    },
}

