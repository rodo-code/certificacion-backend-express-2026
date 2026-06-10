export function validateStudentBody(body, hasId, isComplete) {
    const validProperties = ["name", "grade", "site", "active"];
    if (body) {
        const validPropertiesInBody = validProperties.filter(property => body.hasOwnProperty(property));
        if (isComplete) {
            if (validPropertiesInBody.length != validProperties.length) {
                return {
                    "validation": false,
                    "message": "Body is not complete for student API requirements"
                };
            }
        }
        else {
            if (validPropertiesInBody.length == 0) {
                return {
                    "validation": false,
                    "message": "Body has no valid properties"
                };
            }
        }
        return validateBodyCorrectness(body, validPropertiesInBody);
    }
    else {
        return {
            "validation": false,
            "message": "Body is empty and is required"
        };
    }
}

function validateBodyCorrectness(body, validPropertiesInBody) {
    let validationResult = null;
    for (let property of validPropertiesInBody) {
        switch (property) {
            case "name":
                validationResult = validateName(body.name);
                if (!validationResult.validation) return validationResult;
                break;
            case "grade":
                validationResult = validateGrade(body.grade);
                if (!validationResult.validation) return validationResult;
                break;
            case "site":
                validationResult = validateSite(body.site);
                if (!validationResult.validation) return validationResult;
                break;
            case "active":
                validationResult = validateActive(body.active);
                if (!validationResult.validation) return validationResult;
                break;
        }
    }
    return {
        "validation": true,
        "message": "all validation passed"
    };
}

function validateName(studentName) {
    return {
        "validation": (typeof studentName === "string" && studentName.trim().length > 0),
        "message": "student name must be a non-empty string"
    };
}

function validateGrade(studentGrade) {
    const grade = Number(studentGrade);
    return {
        "validation": (!isNaN(grade) && grade >= 0 && grade <= 100),
        "message": "grade must be a valid number between 0 and 100"
    };
}

function validateSite(studentSite) {
    const validSites = ["LP", "CB", "SC"];
    return {
        "validation": (typeof studentSite === "string" && validSites.includes(studentSite)),
        "message": "site must be either 'LP', 'CB' or 'SC'"
    };
}

function validateActive(studentActive) {
    return {
        "validation": (typeof studentActive === "boolean" || studentActive === 0 || studentActive === 1),
        "message": "active must be a boolean or numbers 0/1"
    };
}