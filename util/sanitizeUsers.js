/**
 * Removes specified fields from each object in an array.
 * @param {Array} users - Array of user objects.
 * @param {Array} fieldsToRemove - Array of field names to remove from each user object.
 * @returns {Array} - Array of sanitized user objects.
 */
const sanitizeUsers = (users, fieldsToRemove) => {
  return users.map((user) => {
    // Assuming user is an instance of a Sequelize model
    const data = user.dataValues || user; // Fallback to user if dataValues doesn't exist
    const sanitizedData = { ...data };

    fieldsToRemove.forEach((field) => {
      delete sanitizedData[field];
    });

    return sanitizedData;
  });
};

module.exports = sanitizeUsers;
