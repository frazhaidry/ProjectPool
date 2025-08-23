const admin = (req, res, next) => { 
    if (!req.user || req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }

  
  next();
};


module.exports = admin;